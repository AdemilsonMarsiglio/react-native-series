import React from 'react';
import {View, Text, Image, TouchableOpacity, StyleSheet, Dimensions} from 'react-native';

const SerieCard = ({serie, isFirstColumn, onNavigation}) => (
    <TouchableOpacity 
        onPress={onNavigation}
        style={[
            styles.container, 
            isFirstColumn ? styles.fristColumn : styles.lastColumn
        ]}
    >
        <View style={styles.card}>
            {
                serie.img  
                    ? <Image 
                        source={
                            {uri: serie.img}
                        }
                        aspectRatio={1}
                        resizeMode="cover"/>
                    : null
            }
            <View style={styles.cardTitleWrapper}>
                <Text style={styles.cardTitle}>{serie.title}</Text>
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
        borderWidth: 1,
    },
    cardTitleWrapper: {
        backgroundColor: 'black',
        height: 50,
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        opacity: .8,
        alignItems: 'center',
        justifyContent: 'center'

    },
    cardTitle: {
        color: 'white',
        fontSize: 15,
        fontWeight: 'bold',

    },
    fristColumn: {
        paddingLeft: 10
    },
    lastColumn: {
        paddingRight: 10
    }
});

export default SerieCard;