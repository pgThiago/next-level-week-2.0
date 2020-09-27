import React, { useState } from 'react';
import { View, Image, Text, Linking } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';

import styles from './styles';
import heartOutLineIcon from '../../assets/images/icons/heart-outline.png';
import unfavoriteIcon from '../../assets/images/icons/unfavorite.png';
import whatsapp from '../../assets/images/icons/whatsapp.png';

import AsyncStorage from '@react-native-community/async-storage';
import api from '../../services/api';

export interface Teacher {
    id: number;
    avatar: string;
    bio: string;
    cost: number;
    name: string;
    subject: string;
    whatsapp: string;
}

interface TeacherItemProps {
    teacher: Teacher;
    favorited: boolean;
    route: {id: Number, auth: Boolean, token: String};
}

const TeacherItem: React.FC<TeacherItemProps> = ({ teacher, favorited, route }) => {

    
    const [ isFavorited, setIsFavorited ] = useState(favorited);

    function handleLinkToWhatsapp(){
        api.post('connections', {
            user_id: teacher.id
        })
        Linking.openURL(`whatsapp://send?phone=${teacher.whatsapp}`);
    }

    async function handleToggleFavorite(){
        
        const favorites = await AsyncStorage.getItem('favorites');
        let favoritesArray = [];

        if(favorites){
            favoritesArray = JSON.parse(favorites);
        }

        if(isFavorited){
            // Remover dos favoritos
            try{

            
            const favoriteIndex = favoritesArray.findIndex((teacherItem: Teacher) => {
                return teacherItem.id === teacher.id;
            });

            favoritesArray.splice(favoriteIndex, 1);

            const { id, token } = route;
                const resp = await api.post('/prof/delfavorites', null, { 
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'user': id,
                        'teacherID': teacher.id
                    },
                });

            console.log(resp.data);

            setIsFavorited(false);
            }
            catch(error){
                console.log('Erro: ', error.response);
            }
            
        }
        else{
            // Adicionar aos favoritos

            try{
                
                favoritesArray.push(teacher);
                const { id, token } = route;
                const resp = await api.post('/prof/favorites', null, { 
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'user': id,
                        'teacherID': teacher.id
                    },
                });

                setIsFavorited(true);
            }
            catch(error){
                console.log('Ta foda salvar os favoritos: ', error.response);
            }
        }
        
        await AsyncStorage.setItem('favorites', JSON.stringify(favoritesArray));

    }

    return(
        <View style={styles.container}>
            <View style={styles.profile}>
                <Image 
                style={styles.avatar}
                source={{ uri: teacher.avatar }}
                />
                <View style={styles.profileInfo}>   
                    <Text style={styles.name}>{teacher.name}</Text>
                    <Text style={styles.subject}>{teacher.subject}</Text>
                </View>
            </View>

            <View>
                <Text style={styles.bio}>
                    {teacher.bio}
                </Text>

                
            </View>
            <View style={styles.footer}>
                <Text style={styles.price}>
                    Preço/hora: {'  '} 
                     <Text style={styles.priceValue}>R$: {teacher.cost}</Text>
                  </Text>
                <View style={styles.buttonsContainer}>
                    <RectButton onPress={handleToggleFavorite}
                    style={[
                        styles.favoriteButton, 
                        isFavorited ? styles.favorited : {}
                        ]}>
                      
                        { isFavorited ? <Image source={unfavoriteIcon} /> :  <Image source={heartOutLineIcon} /> }
                   
                    </RectButton>

                    <RectButton onPress={handleLinkToWhatsapp} style={styles.contactButton}>
                        <Image source={whatsapp} />
                        <Text style={styles.contactButtonText} >Entrar em contato</Text>
                    </RectButton>
                </View>
            </View>
        </View>
    )
}

export default TeacherItem;