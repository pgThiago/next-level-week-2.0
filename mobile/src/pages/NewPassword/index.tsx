import React, { useState } from 'react';
import { View, Text, ImageBackground, SafeAreaView, Image } from 'react-native';

import { BorderlessButton } from 'react-native-gesture-handler';

import backIcon from '../../assets/images/icons/back.png';

import { useNavigation } from '@react-navigation/native';

import styles from './styles';

import GiveClassesBgImage from '../../assets/images/give-classes-background.png';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';

import api from '../../services/api';

function NewPassword({ route }: any){

    //const { email } = route.params
    
    const { navigate } = useNavigation();

    const [emailToken, setToken] = useState('');
    const [senha, setSenha] = useState('');
    const [novaSenha, setNovaSenha] = useState('');
    
    async function handleEnter(){
        try{
            const { email } = route.params;
            if(senha === novaSenha){
                await api.post('/reset_password', { 
                    token: emailToken, password: senha 
                },{
                    params: {
                        email
                    }
                });
                alert("E-mail enviado");
                navigate('Login');
            }
            else{
                alert('Senhas não batem')
                navigate('ForgotPassword');
            }
            
        }
        catch(error){
            alert('Tente novamente com mais atenção.');
        }
    }
    
    async function handleGoBack(){
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
                
                    <TextInput
                        style={styles.tokenText}
                        value={emailToken}
                        onChangeText={text => setToken(text)}
                        placeholder="Token enviado para o seu e-mail"
                    ></TextInput>

                    <TextInput
                        style={styles.senhaText}
                        value={senha}
                        onChangeText={text => setSenha(text)}
                        placeholder="Nova senha"
                    ></TextInput>

                    <TextInput
                        style={styles.novaSenhaText}
                        value={novaSenha}
                        onChangeText={text => setNovaSenha(text)}
                        placeholder="Confirmar nova senha"
                    ></TextInput>

                    <TouchableOpacity onPress={handleEnter} style={styles.enterButton}>
                        <Text style={styles.enterText}>Redefinir senha</Text>
                    </TouchableOpacity>
                    
                </View>                
                
            </ImageBackground>
        </SafeAreaView>
    )
    
}

export default NewPassword;