import React, { useState, useEffect } from 'react';
import { View, ScrollView } from 'react-native';

import styles from './styles';
import PageHeader from '../../components/PageHeader';
import TeacherItem, { Teacher, favorited } from '../../components/TeacherItem';
import AsyncStorage from '@react-native-community/async-storage';
import { useFocusEffect } from '@react-navigation/native';

import api from '../../services/api';

import { useIsFocused } from "@react-navigation/native";

function Favorites({ route }: any){

    const [ favoritesTeachers, setFavorites ] = useState([]);
    const isFocused = useIsFocused();
    const { id, token, auth } = route.params;
    
    
    async function loadFavorites(){
    
        try{
            const favTeachers = await api.post('/prof/loadFavorites', null, { // Retorna i id dos prods favoritos
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'user': id,
                }
            });

            let favArray = favTeachers.data;
            
            let favoritesArrayDatas = [];

            for(let i = 0; i < favArray.length; i++){
                const datas = await api.post('/prof/loadFavoritesContent', null, { // Retorna i id dos prods favoritos
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'proffyid': favArray[i],
                    }
                })
                favoritesArrayDatas.push(datas.data[0]);
            }
            
            setFavorites(favoritesArrayDatas);
        }
        catch(error){
            console.log(error);
        }

    }

    useEffect(() => {
        loadFavorites();
    }, [favoritesTeachers]);
      


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
                            route={{ id, auth, token }}
                        />
                    )
                )}
           </ScrollView>
        </View>
    )
}

export default Favorites;