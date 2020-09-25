import React, { useEffect } from 'react';
import { Text, ImageBackground, SafeAreaView, View, AsyncStorage } from 'react-native';

import { useNavigation } from '@react-navigation/native';

import styles from './styles';

import GiveClassesBgImage from '../../assets/images/give-classes-background.png';
import { TouchableOpacity } from 'react-native-gesture-handler';


function CadastroConcluido(){
    
    const navigation = useNavigation();

    useEffect(() => {
        async function getDatas(){
            const user = await AsyncStorage.getItem('user');
            const userString = `${user}`
            console.log('User string: ', userString);
            const userInformation = JSON.parse(userString);
            const { token, auth } = userInformation;
        }
        getDatas();
    }, []);


    function handleEnter(){
        navigation.navigate('Login');
    }

    return (

            <ImageBackground resizeMode='cover' source={GiveClassesBgImage} style={styles.content}>

                    <Text style={styles.titleText}> Cadastro concluído! </Text>
                    <Text style={styles.text}> Agora você faz parte da plataforma da Proffy</Text>

                    <View style={styles.button}>
                        <TouchableOpacity onPress={handleEnter} style={styles.enterButton}>
                            <Text style={styles.enterText}>Fazer login</Text>
                        </TouchableOpacity>
                    </View>                                 

            </ImageBackground>
    )
    
}

export default CadastroConcluido;