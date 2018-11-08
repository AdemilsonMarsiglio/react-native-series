import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import FormRow from '../components/FormRow';

const SerieFormPage = props => (
    <View>
        <FormRow>
            <TextInput
                style={styles.input}
                placeholder="Titulo"
                value=""
                onChangeText={value => console.log(value)}
            />
        </FormRow>
    </View>
);

const styles = StyleSheet.create({
    input: {
        paddingLeft: 5,
        paddingRight: 5,
        paddingBottom: 5,
    }
    
})

export default SerieFormPage;