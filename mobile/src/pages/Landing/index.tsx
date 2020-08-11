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

function Landing(){

    const [ totalConnections, setTotalConnections ] = useState(0);

    const navigation = useNavigation();

    useEffect(() => {
        api.get('connections').then(response => {
            const { total } = response.data;
            setTotalConnections(total);
        }).catch(err => { console.log(err) })
    }, []);

    function handleNavigateToStudyPage(){
        navigation.navigate('Study');
    }

    function handleNavigateToClassesPage(){
        navigation.navigate('GiveClasses');
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

            <Text style={styles.totalConnections}>
                Total de {totalConnections} conexões já realizadas {' '}
                <Image source={heartIcon} />
            </Text>

        </View>
    );
}

export default Landing;