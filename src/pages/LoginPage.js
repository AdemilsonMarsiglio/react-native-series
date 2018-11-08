import React from 'react';
import { View, Text, TextInput, StyleSheet, Button, ActivityIndicator, Alert } from 'react-native';
import FormRow from '../components/FormRow';
import firebase from 'firebase';

import {connect} from 'react-redux';
import {tryLogin} from '../actions';

class LoginPage extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            mail: '',
            password: '',
            isLoading: false,
            message: ''
        }
    }

    componentDidMount() {
        const config = {
            apiKey: "AIzaSyCfvIgya_WRcH8f24e4BIw2ig8bbWULtu0",
            authDomain: "series-react-3ad5e.firebaseapp.com",
            databaseURL: "https://series-react-3ad5e.firebaseio.com",
            projectId: "series-react-3ad5e",
            storageBucket: "series-react-3ad5e.appspot.com",
            messagingSenderId: "728596818895"
        };
        firebase.initializeApp(config);
    }

    onChangeHandler(field, value) {
        this.setState({
            [field]: value
        });
    }

    tryLogin() {

        this.setState({isLoading: true, message: ''});
        const {mail: email, password} = this.state;

        this.props
            .tryLogin({email, password})
            .then(user => {
                if (user) 
                    return this.props.navigation.replace("Main");

                this.setState({
                    isLoading: false, 
                    message: ""
                });
            })
            .catch(error => {
                this.setState({
                    isLoading: false, 
                    message: this.getMessageByErrorCode(error.code)
                });
            });
    }

    getMessageByErrorCode(errorCode) {
        switch (errorCode) {
            case 'auth/wrong-password': 
                return 'Senha Incorreta.';
            case 'auth/user-not-found': 
                return 'Usuario não encontrado.';
            case 'auth/invalid-email': 
                return 'E-mail inválido.';
            default:
                return `Erro desconhecido (${errorCode})`;
        }
    }

    renderButton() {

        if (this.state.isLoading) 
            return <ActivityIndicator />

        return (
            <Button
                title='Entrar'
                onPress={() => this.tryLogin()} />
        );
    }

    renderMessage() {
        const {message} = this.state;

        if (!message) 
            return null;

        return (
        <View>
            <Text>{message}</Text>
        </View>)
    }

    render() {
        return (
            <View style={styles.container}>
                <FormRow first>
                    <TextInput
                        style={styles.input}
                        placeholder="user@mail.com"
                        value={this.state.mail}
                        onChangeText={value => this.onChangeHandler('mail', value)}
                    />
                </FormRow>
                <FormRow last>
                    <TextInput
                        style={styles.input}
                        placeholder="********"
                        secureTextEntry
                        value={this.state.password}
                        onChangeText={value => this.onChangeHandler('password', value)}
                    />
                </FormRow>

                { this.renderButton()}
                { this.renderMessage()}
                
            </View>
        )
    }
};

const styles = StyleSheet.create({
    container: {
        paddingLeft: 5,
        paddingRight: 5,
    },
    input: {
        paddingLeft: 5,
        paddingRight: 5,
        paddingBottom: 5,
    }
});

export default connect(null /*mapStateToProps*/, {tryLogin} /*mapDispatchToProps*/)(LoginPage);