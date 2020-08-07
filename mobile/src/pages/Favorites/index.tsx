import React from 'react';
import { View, Text } from 'react-native';

import styles from './styles';
import PageHeader from '../../components/PageHeader';

function Favorites(){
    return(
        <View style={styles.container}>
            <PageHeader title="Meus professores favoritos"/>
            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                <Text style={{color: '#FFF', fontSize: 20}} >Só tomorrow</Text>
            </View>
        </View>
    )
}

export default Favorites;