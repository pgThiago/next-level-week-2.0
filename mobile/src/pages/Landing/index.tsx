import React, { useState, useEffect } from 'react';
import { View, Image, Text } from 'react-native';

import styles from './styles';

import landingImg from '../../assets/images/landing.png';
import studyIcon from '../../assets/images/icons/study.png'
import giveClassesIcon from '../../assets/images/icons/give-classes.png'
import heartIcon from '../../assets/images/icons/heart.png';

import { useNavigation } from '@react-navigation/native';

import { RectButton } from 'react-native-gesture-handler';
import api from '../../services/api';

function Landing({ route }: any){

    const [ totalConnections, setTotalConnections ] = useState(0);

    const { id, auth, token } = route.params;

    const { navigate } = useNavigation();

    useEffect(() => {
        api.get('connections').then(response => {
            const { total } = response.data;
            setTotalConnections(total);
        }).catch(err => { console.log(err) })
    }, []);

    function handleNavigateToStudyPage(){
        navigate('Study');
    }

    function goToProfile(){
        navigate('TeacherProfile', { id, auth, token });
    }

    function handleNavigateToClassesPage(){

        navigate('GiveClasses', { id, auth, token });
    }

    function logOut(){
        navigate('Login');
    }
    
    return(
        <View style={styles.container}>

            <Image source={landingImg} style={styles.banner} />

            <Text style={styles.title}>
                Seja bem vindo, {'\n'}
            <Text style={styles.titleBold}>
                O que deseja fazer?
            </Text>
            </Text>

            <View style={styles.buttonsContainer}>
               
                <RectButton onPress={handleNavigateToStudyPage} style={[styles.button, styles.buttonPrimary]}>
                    <Image source={studyIcon} />

                    <Text style={styles.buttonText}>Estudar</Text>
                </RectButton>

                <RectButton onPress={handleNavigateToClassesPage} style={[styles.button, styles.buttonSecundary]}>
                    <Image source={giveClassesIcon} />

                    <Text style={styles.buttonText}>Dar aulas</Text>
                </RectButton>

            </View>
            
            <View style={styles.menuContainer}>
                <RectButton onPress={goToProfile} style={[styles.buttonProfile, styles.buttonPrimary]}>
                    <Text style={styles.profileButtonText}>Meu perfil</Text>
                </RectButton>
            
                <RectButton onPress={logOut} style={[styles.buttonProfile, styles.buttonSecundary]}>
                    <Text style={styles.logOutText}>Sair</Text>
                </RectButton>
            </View>

            <Text style={styles.totalConnections}>
                Total de {totalConnections} conexões já realizadas {' '}
                <Image source={heartIcon} />
            </Text>

            

        </View>
    );
}

export default Landing;