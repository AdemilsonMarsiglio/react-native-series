import React from 'react';
import { 
    ScrollView ,
    View, 
    Picker, 
    Slider, 
    TextInput, 
    Text, 
    Button, 
    ActivityIndicator,
    KeyboardAvoidingView, 
    Alert,
    StyleSheet } from 'react-native';
import FormRow from '../components/FormRow';
import {setField, saveSerie, setWholeSerie, resetForm} from '../actions';

import {connect} from 'react-redux';


class SerieFormPage extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            isLoading:  false
        }
        this.inputs = {};
    }

    componentDidMount() {
        const {navigation, setWholeSerie, resetForm} = this.props;
        const {params} = navigation.state;

        if (params && params.serieToEdit) {
            setWholeSerie(params.serieToEdit);
        } else {
            resetForm();
        }
    }

    focusNextField(id) {
        this.inputs[id].focus();
    }
    
    render() {
        const {serieForm, setField, saveSerie, navigation} = this.props;

        return (
            <KeyboardAvoidingView
                enabled
                behavior="padding" 
                keyboardVerticalOffset={250}
            >
                <ScrollView
                    keyboardShouldPersistTaps='handled'>
                    <FormRow>
                        <TextInput first
                            style={styles.input}
                            placeholder="Titulo"
                            value={serieForm.title}
                            onChangeText={value => setField("title", value)}
                            ref={ input => {
                                this.inputs['title'] = input;
                            }}
                            returnKeyType={ "next" }
                            onSubmitEditing={() => {
                                this.focusNextField('img');
                            }}
                        />
                    </FormRow>
                    <FormRow>
                        <TextInput
                            style={styles.input}
                            placeholder="URL da Imagem"
                            value={serieForm.img}
                            onChangeText={value => setField("img", value)}
                            ref={ input => {
                                this.inputs['img'] = input;
                            }}
                            returnKeyType={ "next" }
                        />
                    </FormRow>
                    <FormRow>
                        <Picker
                            selectedValue={serieForm.gender}
                            onValueChange={itemValue => setField("gender", itemValue)}
                            ref={ input => {
                                this.inputs['gender'] = input;
                            }}
                        >
                            <Picker.Item label="Ação" value="acao" />
                            <Picker.Item label="Comedia" value="comedy" />
                            <Picker.Item label="Terror" value="horror" />
                        </Picker>
                    </FormRow>
                    <FormRow>
                        <View>
                            <View style={styles.sameRow}>
                                <Text>Nota</Text>
                                <Text>{serieForm.rate}</Text>
                            </View>
        
                            <Slider
                                value={serieForm.rate}
                                onValueChange={value=>setField('rate', value)}
                                maximumValue={100}
                                step={5}
                            >
        
                            </Slider>
                        </View>
                    </FormRow>
                    <FormRow>
                        <TextInput
                            style={styles.input}
                            placeholder="Descrição"
                            value={serieForm.description}
                            onChangeText={value => setField("description", value)}
                            numberOfLines={5}
                            multiline
                            ref={ input => {
                                this.inputs['description'] = input;
                            }}
                        />
                    </FormRow>
        
                    {
                        this.state.isLoading 
                        ?   <ActivityIndicator />
                        :   <Button
                                title={"Salvar"}
                                onPress={async () => {
                                    this.setState({isLoading: true});
                                    
                                    try {
                                        await saveSerie(serieForm);
                                    } catch (e) {
                                        Alert.alert("Erro", "Um Erro Ocorreu!", e.message);
                                    } finally {
                                        this.setState({isLoading: false});
                                    }

                                    navigation.goBack();
                                }}
                            />
                    }
                    
                </ScrollView>
            </KeyboardAvoidingView>
        );
    }
}

const styles = StyleSheet.create({
    input: {
        paddingLeft: 5,
        paddingRight: 5,
        paddingBottom: 5,
    },
    picker: {
        height: 50,
        width: '100%'
    },
    sameRow: {
        flexDirection: 'row',
        justifyContent: "space-between",
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 10,
    },

    
})

function mapStateToProps(state) {
    return {
        serieForm: state.serieForm
    };
}
const mapDispatchToProps = {
    setField,
    setWholeSerie,
    saveSerie,
    resetForm
};

export default connect(mapStateToProps, mapDispatchToProps)(SerieFormPage);