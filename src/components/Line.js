import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Line = ({label = '', content = '-'}) => {
    return (
        <View style={style.line}>
            <Text style={[
                style.cell, 
                style.label, 
                label.length > 10 ? style.longLabel : null
            ]}>{label}</Text>
            <Text style={[style.cell, style.content]}>{content}</Text>
        </View>
    );
};

const style = StyleSheet.create({
    line: {
        flexDirection: 'row',
        paddingTop: 3,
        paddingBottom: 3,
        borderWidth: 1,
        borderColor: 'lightgray',
    },
    cell: {
        fontSize: 16,
        paddingLeft: 5,
    },
    label: {
        fontWeight: 'bold',
        flex: 2
    },
    longLabel: {
        fontSize: 12
    },
    content: {
        flex: 8
    }
});

export default Line;