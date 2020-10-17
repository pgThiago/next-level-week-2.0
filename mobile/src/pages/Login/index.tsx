import React, { useEffect, useState } from 'react';
import { View, Text, ImageBackground, SafeAreaView } from 'react-native';
import CheckBox from '@react-native-community/checkbox';

import { useIsFocused } from "@react-navigation/native";
import { useNavigation } from '@react-navigation/native';

import styles from './styles';

import GiveClassesBgImage from '../../assets/images/give-classes-background.png';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';

import api from '../../services/api';
import AsyncStorage from '@react-native-community/async-storage';

function Login(){
    
    const { navigate } = useNavigation();
    const isFocused = useIsFocused();

    const [toggleCheckBox, setToggleCheckBox] = useState(false);

    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    
    useEffect(() => {        
        setEmail('');
        setSenha('');
    }, [isFocused]);

    function handleCheckBox(){
        setToggleCheckBox(!toggleCheckBox)
    }
    
    useEffect(() => {
        async function randomFunction(){
            try{
                const user = await AsyncStorage.getItem('user');
                
                const userAsObject = JSON.parse(`${user}`);
                const { id, auth, token } = userAsObject;

                if(auth){
                    navigate('Landing', { id, auth, token });
                }
                else{
                    navigate('Login');
                }
            }
            catch(error){
                navigate('Login');
            }
        }
        randomFunction();
    }, []);

    
    async function handleEnter(){

        try{
                       
            const loginInfo = await api.post('/login', {
                email: email,
                password: senha
            })

            const { id, auth, token } = loginInfo.data;

            const userDatasToKeepLogged = {
                id,
                token,
                auth,
                email,
                password: senha
            }

            const userDatasToNotKeepLogged = {
                id,
                token,
                auth,
                email,
                password: senha
            }

            if(toggleCheckBox && auth){
                await AsyncStorage.setItem('user', JSON.stringify(userDatasToKeepLogged));
                navigate('Landing', { id, token, auth });
            }
            else if(!toggleCheckBox && auth){
                await AsyncStorage.setItem('user', JSON.stringify(userDatasToNotKeepLogged));
                navigate('Landing', { id, token, auth });
            }
            else{
                alert('Try again!');
            }
        
        }
        catch(error){
            console.log(error);
            alert('Incorrect email or password');
            navigate('Login');
        }
        
    }

    function handleCreateAccount(){
        navigate('Cadastro');
    }

    function handleForgotPass(){
        navigate('ForgotPassword');
    }

    return (

        <SafeAreaView style={styles.container} >
            <ImageBackground resizeMode='cover' source={GiveClassesBgImage} style={styles.content}>

                <View style={styles.header}>
                    <Text style={styles.logo}>Proffy</Text>
                    <Text style={styles.logoText}>Sua plataforma de estudos online.</Text>
                </View>
            
            <View style={styles.inputContainer}>

                <View style={styles.inputHeader}>
                    <Text style={styles.inputTitle}>Fazer login</Text>
                    <TouchableOpacity onPress={handleCreateAccount}>
                        <Text style={styles.createAccountText}>Criar uma conta</Text>
                    </TouchableOpacity>
                </View>
                
                <View style={styles.inputGroup}>
                   
                    <TextInput
                        autoFocus={true}
                        autoCorrect={false}
                        autoCapitalize="none"
                        value={email}
                        onChangeText={text => setEmail(text)}
                        placeholder="E-mail" 
                        style={styles.emailText}>
                    </TextInput>
                    
                    <TextInput 
                        autoCorrect={false}
                        value={senha}
                        onChangeText={text => setSenha(text)}
                        placeholder="Senha" 
                        secureTextEntry={true} 
                        style={styles.passwordText}>
                    </TextInput>
                    
                    <View style={styles.inputFooter}>
                    
                        <View style={styles.rememberBox} >
                            <CheckBox
                                tintColors= { true ? '#fff' : '#000' }
                                onFillColor='#fff'
                                disabled={false}
                                value={toggleCheckBox}
                                onChange={handleCheckBox}
                                onValueChange={(newValue) => setToggleCheckBox(newValue)}
                            />
                            <Text style={styles.rememberText}> Lembrar-me </Text>
                        </View>

                        <TouchableOpacity style={styles.forgotPasswordButton} onPress={handleForgotPass}>
                            <Text style={styles.forgotPasswordText}>Esqueci minha senha</Text>
                        </TouchableOpacity>

                    </View>

                </View>
                
            </View>

            <View style={styles.button}>
                <TouchableOpacity onPress={handleEnter} style={styles.enterButton}>
                    <Text style={styles.enterText}>Entrar</Text>
                </TouchableOpacity>
            </View>            

            </ImageBackground>
        </SafeAreaView>
    )
    
}

export default Login;