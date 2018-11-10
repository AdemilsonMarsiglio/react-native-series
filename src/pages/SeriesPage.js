import React from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator} from 'react-native';

import SerieCard from '../components/SerieCard';
import AddSerieCard from '../components/AddSerieCard';
import {watchSeries} from '../actions';

import { connect } from 'react-redux';

class SeriesPage extends React.Component {

    componentDidMount() {
        this.props.watchSeries();
    }    

    render() {
        const { series, navigation } = this.props;

        if (series === null) {
            return <ActivityIndicator/>
        }

        return (
            <View>
                <FlatList
                    style={styles.flatList}
                    data={[...series, { isLast: true }]}
                    renderItem={({ item, index }) => (
                        item.isLast
                            ? <AddSerieCard
                                isFirstColumn={index % 2 === 0}
                                onNavigation={() => navigation.navigate('SerieForm')}
                            />
                            : <SerieCard
                                serie={item}
                                isFirstColumn={index % 2 === 0}
                                onNavigation={() => navigation.navigate('SerieDetail', { serie: item })} />
                    )}
                    keyExtractor={({ id }) => id}
                    numColumns={2}
                />
            </View>
        )


    }
}

const styles = StyleSheet.create({
    flatList: {
        marginBottom: 5,
        marginTop: 5,
    },

})

const mapStateToProps = state => {
    const {series} = state;

    if (series === null)
        return {series};

    const keys = Object.keys(series);

    const seriesWithKeys = keys.map(id => {
        return {...series[id], id};
    })

    return { series:  seriesWithKeys};
};

export default connect(mapStateToProps, {watchSeries})(SeriesPage);