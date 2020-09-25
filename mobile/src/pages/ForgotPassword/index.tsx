import React, { useState } from 'react';
import { View, Text, ImageBackground, SafeAreaView, Image } from 'react-native';

import { BorderlessButton } from 'react-native-gesture-handler';

import backIcon from '../../assets/images/icons/back.png';

import { useNavigation } from '@react-navigation/native';

import styles from './styles';

import GiveClassesBgImage from '../../assets/images/give-classes-background.png';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';

import api from '../../services/api';

function ForgotPassword(){
    
    const { navigate } = useNavigation();

    const [userEmail, setEmail] = useState('');

    async function handleEnter(event: any){
        try{
            const response = await api.post('/forgot_password', {
                email: userEmail
            });
            const { email, token } = response.data;
            console.log('response.data do componente forgot password:', response.data);
            navigate('NewPassword', {
                email,
                token
            });
        }
        catch(error){
            console.log(error);
        }
    }

    function handleGoBack(){
        navigate('Login');
    }

    return (

        <SafeAreaView style={styles.container} >
            <ImageBackground resizeMode='cover' source={GiveClassesBgImage} style={styles.content}>
                <BorderlessButton onPress={handleGoBack}>
                    <Image source={backIcon} resizeMode="contain" />
                </BorderlessButton>
                <View style={styles.header}>
                    <Text style={styles.logo}>Proffy</Text>
                    <Text style={styles.logoText}>Sua plataforma de estudos online.</Text>
                </View>
                

                <View style={styles.contentText}>
                    
                    <Text style={styles.title}>Esqueceu sua senha?</Text>
                    <Text style={styles.text}>Não esquenta,</Text>
                    <Text style={styles.text}>vamos dar um jeito nisso.</Text>

                    <TextInput
                    style={styles.emailText}
                        value={userEmail}
                        onChangeText={text => setEmail(text)}
                        placeholder="Brota seu email aqui, Fella."
                    >
                    </TextInput>
                    <TouchableOpacity onPress={handleEnter} style={styles.enterButton}>
                        <Text style={styles.enterText}>Enviar</Text>
                    </TouchableOpacity>

                </View>                
                
            </ImageBackground>
        </SafeAreaView>
    )
    
}

export default ForgotPassword;