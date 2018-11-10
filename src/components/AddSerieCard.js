import React from 'react';
import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';


const AddSerieCard = ({serie, isFirstColumn, onNavigation}) => (
    <TouchableOpacity 
        onPress={onNavigation}
        style={[styles.container, isFirstColumn ? styles.fristColumn : styles.lastColumn]}
    >
        <View style={styles.top}>
            <Image 
                source={require('../../resources/plus.png')}
                style={styles.image}/>
        </View>
    </TouchableOpacity>
);

const styles = StyleSheet.create({
    container: {
        width: 50,
        height: 50,
    },
    top: {
        flex: 1,
        backgroundColor: '#8BC34A',
        borderRadius: 25
    },
    image: {
        top: '25%',
        left: '25%',
        width: '50%',
        height: '50%',
    }
});

export default AddSerieCard;