import React from 'react';
import {View, Text, Image, TouchableOpacity, StyleSheet, Dimensions} from 'react-native';


const AddSerieCard = ({serie, isFirstColumn, onNavigation}) => (
    <TouchableOpacity 
        onPress={onNavigation}
        style={[styles.container, isFirstColumn ? styles.fristColumn : styles.lastColumn]}
    >
        <View style={styles.card}>
            <Image 
                source={require('../../resources/add.png')}
                style={styles.image}/>
                
                <View>
                    <Text>Aqui</Text>
                </View>
        </View>
    </TouchableOpacity>
);

const styles = StyleSheet.create({
    container: {
        width: Dimensions.get("window").width / 2,
        height: Dimensions.get("window").width / 2,
        padding: 5
    },
    card: {
        flex: 1,
    },
    fristColumn: {
        paddingLeft: 10
    },
    lastColumn: {
        paddingRight: 10
    },
    image: {
        width: '100%',
        height: '100%',
    }
});

export default AddSerieCard;