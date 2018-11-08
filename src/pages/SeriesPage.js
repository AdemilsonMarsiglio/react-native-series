import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

import SerieCard from '../components/SerieCard';
import AddSerieCard from '../components/AddSerieCard';

import series from '../../series.json';

const SeriesPage = props => (
    <View>
        <FlatList
            style={styles.flatList}
            data={[...series, {isLast: true}]}
            renderItem={({ item, index }) => (
                item.isLast 
                ?   <AddSerieCard 
                        isFirstColumn={index % 2 === 0}
                        onNavigation={() => props.navigation.navigate('SerieForm')}
                    />
                :   <SerieCard 
                            serie={item}
                            isFirstColumn={index % 2 === 0}
                            onNavigation={() => props.navigation.navigate('SerieDetail', {serie: item})} />
            )}
            keyExtractor= {({id}) => id}
            numColumns={2}
        />
    </View>
);

const styles = StyleSheet.create({
    flatList: {
        marginBottom: 5,
        marginTop: 5,
    },
    
})

export default SeriesPage;