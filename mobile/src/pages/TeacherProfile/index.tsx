import React, { useEffect, useState } from 'react';

import { View, Text, TouchableOpacity } from 'react-native';

import styles from './styles';

import { ScrollView, TextInput } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import ProfileHeader from '../../components/ProfileHeader';

import api from '../../services/api';

import convertMinutesToHours from '../../utils/convertMinutesToHours';
import getMinutes from '../../utils/getMinutes';

import getDayOfTheWeek from '../../utils/dayOfWeek';

import { useIsFocused } from "@react-navigation/native";

function GiveClasses({ route }: any){

    const { id, auth, token } = route.params;

    const { navigate } = useNavigation();
    const isFocused = useIsFocused();
    
    const [ name, setName ] = useState('');
    const [ last_name, setLastName ] = useState('');
    const [ avatar, setAvatar ] = useState('');
    const [ bio, setBio ] = useState('');
    const [ subject, setSubject ] = useState('');
    const [ cost, setCost ] = useState('');
    const [ week_day, setWeekDay ] = useState<string>('');
    const [ from, setFrom ] = useState('');
    const [ to, setTo ] = useState('');
    
    const [ email, setEmail ] = useState('');
    const [ whatsapp, setWhatsapp ] = useState('');


    useEffect(() => {
        if(!id || !token || !auth){
            navigate('Landing');
        }
    }, [isFocused]);

    function handleEnter(){
        navigate('Landing');
    }

    useEffect(() => {
    
        async function getProffyDatas(){
            try{

                const userInfo = await api.get('/profile', {
                    params: {
                        id
                    },                  
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                console.log(userInfo.data)
                if(userInfo.data.length === 0){
                    alert('Você precisa se cadastrar em "Dar Aulas" primeiro.');
                    navigate('GiveClasses', { id, auth, token });
                }
                let { avatar, name, last_name, email, whatsapp, bio, week_day, subject, cost, from, to } = userInfo.data[0];

                let week_day_as_string = String(week_day);
                let cost_as_string = String(cost);

                const alphabetic_day = getDayOfTheWeek(week_day_as_string);
               
                setAvatar(avatar);
                setName(name);
                setLastName(last_name);
                setEmail(email);
                setWhatsapp(whatsapp);
                setBio(bio);
                setSubject(subject);
                setCost(cost_as_string);
                setWeekDay(alphabetic_day);
                
                let fromHours = convertMinutesToHours(from);
                let fromMinutes = getMinutes(from);
                let fromTime = `${fromHours}:${fromMinutes}`;

                if(fromTime.length < 5){
                   
                    let fromTimeSplit = fromTime.split(':');
                   
                    if(fromTimeSplit[0].length === 1 && fromTimeSplit[1].length === 1){
                        fromTime = `0${fromHours}:${fromMinutes}0`;
                    }
                    
                    if(fromTimeSplit[0].length === 2 && fromTimeSplit[1].length === 1){
                        fromTime = `${fromHours}:${fromMinutes}0`;
                        console.log(fromTime)
                    }

                    if(fromTimeSplit[0].length === 1 && fromTimeSplit[1].length === 2){
                        fromTime = `0${fromHours}:${fromMinutes}`;
                    }
                   

                }


                let toHours = convertMinutesToHours(to);
                let toMinutes = getMinutes(to);
                let toTime = `${toHours}:${toMinutes}`;

                if(toTime.length < 5){
                   
                    let toTimeSplit = toTime.split(':');
                    
                    if(toTimeSplit[0].length === 1 && toTimeSplit[1].length === 1)
                        toTime = `0${toHours}:${toMinutes}0`;
                    
                    if(toTimeSplit[0].length === 2 && toTimeSplit[1].length === 1)
                        toTime = `${toHours}:${toMinutes}0`;

                    if(toTimeSplit[0].length === 1 && toTimeSplit[1].length === 2)
                        toTime = `0${toHours}:${toMinutes}`;

                }
                

                setFrom(fromTime);
                setTo(toTime);
                
            }
            catch(error){
                console.log(error);
            }
        }
        getProffyDatas();
    }, []);

    return(
        <View style={styles.container}>

            <ProfileHeader 
                profileImage={avatar}
                name= {name}
                subject= {subject}
            />

            <View style={styles.dataContainer}>
                <ScrollView showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false} >
            
                    <Text style={styles.title}>Seus dados</Text>

                    <Text style={styles.label}>Nome:</Text>
                    <TextInput 
                        style={styles.nameText}
                        value={name}
                        onChangeText={text => setName(text)}
                    ></TextInput>

                    <Text style={styles.label}>Sobrenome:</Text>
                    <TextInput 
                        style={styles.lastnameText}
                        value={last_name}
                        onChangeText={text => setLastName(text)}
                    ></TextInput>

                    <Text style={styles.label}>Email:</Text>
                    <TextInput 
                        autoCapitalize="none"
                        style={styles.emailText}
                        value={email}
                        onChangeText={text => setLastName(text)}
                    ></TextInput>

                    <Text style={styles.label}>WhatsApp:</Text>
                    <TextInput 
                        style={styles.whatsappText}
                        value={whatsapp}
                        onChangeText={text => setWhatsapp(text)}
                    ></TextInput>

                    <Text style={styles.label}>Avatar:</Text>
                    <TextInput 
                        style={styles.avatar}
                        value={avatar}
                        onChangeText={text => setAvatar(text)}
                    ></TextInput>

                    <Text style={styles.label}>Biografia:</Text>
                    <TextInput
                        style={styles.bioText}
                        value={bio}
                        onChangeText={text => setBio(text)}
                    ></TextInput>

                    <Text style={styles.workTimeTitle}>Sobre a aula</Text>

                    <Text style={styles.label}>Matéria:</Text>
                    <TextInput 
                        style={styles.materiaText}
                        value={subject}
                        onChangeText={text => setSubject(text)}
                    ></TextInput>

                    <Text style={styles.label}>Custo da sua hora por aula:</Text>
                    <TextInput 
                        style={styles.custoText}
                        value={cost}
                        onChangeText={text => setCost(text)}
                    ></TextInput>

                    <Text style={styles.workTimeTitle}>Horários disponíveis</Text>
                   
                    <Text style={styles.label}>Dia da semana:</Text>
                    <TextInput 
                        style={styles.weekText}
                        value={week_day}
                        onChangeText={text => setWeekDay(text)}
                    ></TextInput>

                    <Text style={styles.label}>Das:</Text>
                    <TextInput 
                        style={styles.fromText}
                        value={from}
                        onChangeText={text => setFrom(text)}
                    ></TextInput>

                    <Text style={styles.label}>Até:</Text>
                    <TextInput 
                        style={styles.toText}
                        value={to}
                        onChangeText={text => setTo(text)}
                    ></TextInput>                    
            
                </ScrollView>
                
            </View>
            
            <View>
                <TouchableOpacity onPress={handleEnter} style={styles.enterButton}>
                    <Text style={styles.enterText}>Salvar perfil</Text>
                </TouchableOpacity>
            </View>
            
        </View>
    )
}

export default GiveClasses;