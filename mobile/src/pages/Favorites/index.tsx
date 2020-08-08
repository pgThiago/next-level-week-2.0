import React, { useState } from 'react';
import { View, ScrollView } from 'react-native';

import styles from './styles';
import PageHeader from '../../components/PageHeader';
import TeacherItem, { Teacher } from '../../components/TeacherItem';
import AsyncStorage from '@react-native-community/async-storage';
import { useFocusEffect } from '@react-navigation/native';

function Favorites(){

    const [ favoritesTeachers, setFavoritesTeachers ] = useState([]);

    function loadFavorites(){
        AsyncStorage.getItem('favorites').then(response => {
            if(response){
                const favoritedTeachers = JSON.parse(response);
                setFavoritesTeachers(favoritedTeachers);
            }
        });
    }

    useFocusEffect(
        React.useCallback(() => {
          loadFavorites();
        }, [favoritesTeachers])
    )

    return(
        <View style={styles.container}>
            <PageHeader title="Meus professores favoritos"/>
            <ScrollView 
            style={styles.favoriteList}
            contentContainerStyle={{
                paddingHorizontal: 16,
                paddingBottom: 16
            }}
            >
                {favoritesTeachers.map((teacher: Teacher) => (
                        <TeacherItem 
                            key={teacher.id}
                            teacher={teacher}
                            favorited={favoritesTeachers ? true : false} 
                        />
                    )
                )}
           </ScrollView>
        </View>
    )
}

export default Favorites;