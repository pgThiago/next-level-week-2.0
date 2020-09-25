import React, { useEffect, useState } from 'react';

import { View, Text, TouchableOpacity } from 'react-native';

import styles from './styles';

import api from '../../services/api';

import { ScrollView, TextInput } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import SignupHeader from '../../components/SignupHeader';

import { useIsFocused } from "@react-navigation/native";

function GiveClasses({ route }: any){

    const { id, token, auth } = route.params;
    
    const { navigate } = useNavigation();
    const isFocused = useIsFocused();
    
    const [ name, setName ] = useState('');
    const [ last_name, setLastName ] = useState('');
    const [ avatar, setAvatar ] = useState('');
    const [ whatsapp, setWhatsapp ] = useState('');
    const [ bio, setBio ] = useState('');
    const [ subject, setSubject ] = useState('');
    const [ cost, setCost ] = useState('');
    
    let [ week_day, setWeekDay ] = useState('');
    const [ from, setFrom ] = useState('');
    const [ to, setTo ] = useState('');
    
    const [ scheduleItems, setScheduleItems ] = useState([
        { week_day: 0, from: '', to: '' }
    ]);

    useEffect(() => {
        if(!id || !token){
            navigate('Landing');
        }
    }, [isFocused]);

    async function handleEnter(){
        
        const userInfo = await api.get('/profile', {
            params: {
                id
            },                  
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        let week_day_as_number = Number(week_day);
        setScheduleItems([
            {week_day: week_day_as_number, from, to}
        ]);
        
        if(userInfo.data.length === 0){
            await api.post('classes', {
                name, 
                avatar, 
                whatsapp, 
                bio, 
                subject, 
                cost: Number(cost), 
                schedule: scheduleItems,
            },{
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                params: {
                    id
                }
            }).then(() => {
                navigate('TeacherProfile', {id, auth, token});
            })
            .catch((error) => console.log('Erro no TeacherForm: ', error));
        }
        else{
            alert('Você já tem um cadastro.');
            navigate('TeacherProfile', {id, auth, token});
        }
    }

    return(
        <View style={styles.container}>

            <SignupHeader 
                title="Que incrível que você quer dar aulas."
                subTitle= "O primeiro passo é preencher esse formulário de inscrição."
            />

            <View style={styles.dataContainer}>
                <ScrollView showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false} >
            
                    <Text style={styles.title}>Seus dados</Text>

                    <Text style={styles.label}>Nome:</Text>
                    <TextInput 
                        placeholder="..."
                        style={styles.nameText}
                        value={name}
                        onChangeText={text => setName(text)}
                    ></TextInput>

                    <Text style={styles.label}>Sobrenome:</Text>
                    <TextInput 
                        placeholder="..."
                        style={styles.lastnameText}
                        value={last_name}
                        onChangeText={text => setLastName(text)}
                    ></TextInput>

                    <Text style={styles.label}>Avatar:</Text>
                    <TextInput 
                        placeholder="..."
                        style={styles.avatar}
                        value={avatar}
                        onChangeText={text => setAvatar(text)}
                    ></TextInput>

                    <Text style={styles.label}>WhatsApp:</Text>
                    <TextInput 
                        placeholder="..."
                        style={styles.whatsappText}
                        value={whatsapp}
                        onChangeText={text => setWhatsapp(text)}
                    ></TextInput>

                    <Text style={styles.label}>Biografia:</Text>
                    <TextInput
                        placeholder="..."
                        style={styles.bioText}
                        value={bio}
                        onChangeText={text => setBio(text)}
                    ></TextInput>

                    <Text style={styles.workTimeTitle}>Sobre a aula</Text>

                    <Text style={styles.label}>Matéria:</Text>
                    <TextInput 
                        placeholder="..."
                        style={styles.materiaText}
                        value={subject}
                        onChangeText={text => setSubject(text)}
                    ></TextInput>

                    <Text style={styles.label}>Custo da sua hora por aula:</Text>
                    <TextInput 
                        placeholder="..."
                        style={styles.custoText}
                        value={cost}
                        onChangeText={text => setCost(text)}
                    ></TextInput>

                    <Text style={styles.workTimeTitle}>Horários disponíveis</Text>
                   
                   
                    <Text style={styles.label}>Dia da semana:</Text>               
                    
                    <TextInput 
                        placeholder="..."
                        style={styles.weekText}
                        value={week_day}
                        onChangeText={text => setWeekDay(text)}
                    ></TextInput>

                    <Text style={styles.label}>Das:</Text>
                    <TextInput 
                        placeholder="..."
                        style={styles.fromText}
                        value={from}
                        onChangeText={text => setFrom(text)}>
                    </TextInput>

                    <Text style={styles.label}>Até:</Text>
                    <TextInput 
                        placeholder="..."
                        style={styles.toText}
                        value={to}
                        onChangeText={text => setTo(text)}>
                    </TextInput>
            
                </ScrollView>
                
            </View>
            
            <View>
                <TouchableOpacity onPress={handleEnter} style={styles.enterButton}>
                    <Text style={styles.enterText}>Finalizar cadastro</Text>
                </TouchableOpacity>
            </View>
            
        </View>
    )
}

export default GiveClasses;