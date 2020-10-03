import React, { useState, useContext, useEffect } from 'react';
import { View, Image, Text, Linking } from 'react-native';
import { RectButton, TouchableOpacity } from 'react-native-gesture-handler';

import styles from './styles';
import heartOutLineIcon from '../../assets/images/icons/heart-outline.png';
import unfavoriteIcon from '../../assets/images/icons/unfavorite.png';
import whatsapp from '../../assets/images/icons/whatsapp.png';

import api from '../../services/api';

import { useFocusEffect, useIsFocused } from '@react-navigation/native';
import useForceUpdate from 'use-force-update';


import { ReloadContext } from '../../context';


export interface Teacher {
    id: number;
    avatar: string;
    bio: string;
    cost: number;
    name: string;
    subject: string;
    whatsapp: string;
}

export interface TeacherItemProps {
    teacher: Teacher;
    favorited: boolean;
    route: {id: Number, auth: Boolean, token: String};
}

const TeacherItem: React.FC<TeacherItemProps> = ({ teacher, route, favorited }) => {

    const [ isItemFavorited, setIsItemFavorited ] = useState(favorited);

    const shouldReload = useContext(ReloadContext);
    const { handleToggle, fav } = shouldReload;

    useEffect(() => {
        handleToggle(favorited);
    }, [favorited]);


    function handleLinkToWhatsapp(){
        api.post('connections', {
            user_id: teacher.id
        })
        Linking.openURL(`whatsapp://send?phone=${teacher.whatsapp}`);
    }

    async function handleToggleFavorite(){
        if(favorited){
            // Remover dos favoritos
            try{

                const { id, token } = route;
                    await api.post('/prof/delfavorites', null, { 
                        headers: {
                            'Authorization': `Bearer ${token}`,
                            'user': id,
                            'teacherID': teacher.id
                        },
                    });
                    setIsItemFavorited(fav);
            }
            
            catch(error){
                console.log('Erro ao remover dos: ', error);
            }
            
        }
        else{
            // Adicionar aos favoritos
            try{
                
                const { id, token } = route;
                
                await api.post('/prof/favorites', null, { 
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'user': id,
                        'teacherID': teacher.id
                    },
                });
                setIsItemFavorited(!favorited);
            }
            catch(error){
                console.log('Erro ao salvar os favoritos: ', error.response);
            }
        }
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
                    <TouchableOpacity onPress={handleToggleFavorite}
                    
                    style={[
                        styles.favoriteButton, 
                            favorited ? styles.favorited : {}
                        ]}>
                      
                        {  favorited ? <Image source={unfavoriteIcon} /> :  <Image source={heartOutLineIcon} /> }
                   
                    </TouchableOpacity>

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
