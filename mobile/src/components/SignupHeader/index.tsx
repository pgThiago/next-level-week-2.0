import React, { ReactNode } from 'react';

import { View, Image, Text } from 'react-native';

import styles from './styles';
import { BorderlessButton } from 'react-native-gesture-handler';

import backIcon from '../../assets/images/icons/back.png';
import logoImg from '../../assets/images/logo.png';
import { useNavigation } from '@react-navigation/native';

interface SignupHeaderProps {
    title: string;
    subTitle: string;
    headerRight?: ReactNode;
}

const SignupHeader: React.FC<SignupHeaderProps> = ({ title, subTitle, headerRight }) => {

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
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.subTitle}>{subTitle}</Text>
                {headerRight}
            </View>
        </View>
    )
}

export default SignupHeader;