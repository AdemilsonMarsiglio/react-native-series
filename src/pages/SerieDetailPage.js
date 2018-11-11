import React from 'react';
import { connect } from 'react-redux';
import { View, ScrollView, Button, Image, StyleSheet, BackHandler } from 'react-native';

import Line from '../components/Line';
import LongText from '../components/LongText';
import { deleteSerie } from '../actions';

class SerieDetailPage extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        console.log('adicionou o evento');
        BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
    }

    componentWillUnmount() {
        console.log('removeu o evento');
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
    }

    handleBackPress = () => {
        console.log("passou no backPress")
        this.goBack(); // works best when the goBack is async
        return true;
    }

    render() {
        const { navigation } = this.props;
        const { serie } = navigation.state.params;

        return (
            <ScrollView>
                {
                    serie.img
                        ? <Image
                            source={{ uri: serie.img }}
                            style={styles.image}
                        />
                        : null
                }
                <Line label="Título" content={serie.title} />
                <Line label="Gênero" content={serie.gender} />
                <Line label="Nota" content={serie.rate} />
                <LongText label="Descrição" content={serie.description} />
                <View style={styles.button}>
                    <Button
                        title="Editar"
                        onPress={() => {
                            navigation.replace('SerieForm', { serieToEdit: serie });
                        }}
                    />
                </View>
                <View style={styles.button}>
                    <Button
                        title="Deletar"
                        color="red"
                        style={styles.button}
                        onPress={async () => {
                            const hasDeleted = await this.props.deleteSerie(serie);

                            if (hasDeleted)
                                navigation.goBack();
                        }}
                    />
                </View>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    image: {
        aspectRatio: 1
    },
    button: {
        margin: 10
    }
})

const mapDispatchToProps = {
    deleteSerie
}

export default connect(null, mapDispatchToProps)(SerieDetailPage);