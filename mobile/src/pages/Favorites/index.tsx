import React, { useState, useEffect, useContext } from 'react';
import { View } from 'react-native';

import styles from './styles';
import PageHeader from '../../components/PageHeader';
import TeacherItem, { Teacher } from '../../components/TeacherItem';

import api from '../../services/api';

import { useFocusEffect } from '@react-navigation/native';
import { FlatList } from 'react-native-gesture-handler';

function Favorites({ route }: any){
    const { id, token, auth } = route.params;
    const [ favoritesTeachers, setFavorites ] = useState<object>([]);
    
    async function loadFavorites(){
        try{
            const favTeachers = await api.post('/prof/loadFavorites', null, { // Retorna o id dos profs favoritos
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'user': id,
                }
            });

            let favArray = favTeachers.data;
            
            let favoritesArrayDatas = [];

            for(let i = 0; i < favArray.length; i++){
                const datas = await api.post('/prof/loadFavoritesContent', null, { // Retorna o id dos profs favoritos
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
            console.log('Deu ruim no loadFavorites do componente Favorites: ', error);
        }

    }

    useFocusEffect(
        React.useCallback(() => {
            loadFavorites();
        }, [])
    );

    return(
        <View style={styles.container}>
            <PageHeader title="Meus professores favoritos"/>
            <FlatList

                style={styles.favoriteList}
                contentContainerStyle={{
                    paddingHorizontal: 16,
                    paddingBottom: 16
                }}
                data={favoritesTeachers}
                keyExtractor={( item: Teacher) => `${item.id}`}
                renderItem={ ({ item }) => (
                    <TeacherItem 
                        key={item.id}
                        teacher={item}
                        route={{ id, auth, token }}
                        favorited={true}
                    />
                ) } 
            />   
        </View>
    )
}

export default Favorites;
