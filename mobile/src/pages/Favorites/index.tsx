import React, { useState, useEffect } from 'react';
import { View, ScrollView } from 'react-native';

import styles from './styles';
import PageHeader from '../../components/PageHeader';
import TeacherItem, { Teacher } from '../../components/TeacherItem';
import AsyncStorage from '@react-native-community/async-storage';
import { useFocusEffect } from '@react-navigation/native';

import api from '../../services/api';

import { useIsFocused } from "@react-navigation/native";

function Favorites({ route }: any){

    const [ favoritesTeachers, setFavoritesTeachers ] = useState([]);
    const isFocused = useIsFocused();

    async function loadFavorites(){
        AsyncStorage.getItem('favorites').then(response => {
            if(response){
                const favoritedTeachers = JSON.parse(response);
                setFavoritesTeachers(favoritedTeachers);
            }
        });
    
        const { id, token } = route;
        try{

            await api.post('/prof/loadFavorites', {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'user': id,
                }
            });
        }
        catch(error){
            console.log(error.response);
        }


    }

    useFocusEffect(
        React.useCallback(() => {
          loadFavorites();
        }, [isFocused])
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
                            favorited 
                        />
                    )
                )}
           </ScrollView>
        </View>
    )
}

export default Favorites;