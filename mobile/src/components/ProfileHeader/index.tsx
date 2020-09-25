import React, { ReactNode, useEffect, useState } from 'react';

import { View, Image, Text } from 'react-native';

import styles from './styles';
import { BorderlessButton } from 'react-native-gesture-handler';

import backIcon from '../../assets/images/icons/back.png';
import logoImg from '../../assets/images/logo.png';
import { useNavigation } from '@react-navigation/native';

interface ProfileHeaderProps {
    profileImage: string;
    name: string;
    subject: string;
    headerRight?: ReactNode;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ profileImage, name, subject }) => {

    const { navigate } = useNavigation();

    function handleGoBack(){
        navigate('Landing');
    }

    return(
        <View style={styles.container}>
            <View  style={styles.topBar}>
                <BorderlessButton onPress={handleGoBack}>
                    <Image source={backIcon} resizeMode="contain" />
                </BorderlessButton>    
                <Image source={logoImg} resizeMode="contain" />        
            </View>

            <View style={styles.header}>
                <Image style={styles.profileImage} source={{ uri: profileImage }} />
                <Text style={styles.profileName}>{name}</Text>
                <Text style={styles.profileSubject}>{subject}</Text>
            </View>
        </View>
    )
}

export default ProfileHeader;