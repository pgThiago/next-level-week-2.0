import React, { useState, useEffect } from 'react';
import { View, Text, FlatList } from 'react-native';
import { TextInput, BorderlessButton, RectButton } from 'react-native-gesture-handler';
import { useFocusEffect } from '@react-navigation/native';

import styles from './styles';
import PageHeader from '../../components/PageHeader';
import TeacherItem, { Teacher } from '../../components/TeacherItem';


import { Feather } from '@expo/vector-icons';
import api from '../../services/api';

import { useIsFocused } from "@react-navigation/native";

function TeacherList({ route }: any){
    
    const isFocused = useIsFocused();

    const { id, auth, token } = route.params;
    
    const [isFiltersVisible, setIsFiltersVisible] = useState(false);

    const [ teachers, setTeachers ] = useState([]);
    const [ favoritesTeachers, setFavorites ] = useState<number[]>([]);

    const [ subject, setSubject ] = useState('');
    const [ week_day, setWeek_day ] = useState('');
    const [ time, setTime ] = useState('');

    async function loadFavoritos(){
    
        try{
    
            const favTeachers = await api.post('/prof/loadFavorites', null, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'user': id,
                }
            });

            const favArray = favTeachers.data;

            const favoritedIds = favArray.map((id: any) => {
                return id
            })

            setFavorites(favoritedIds);

        }

        catch(error){
            console.log('Erro ao carregar os favoritos na página Teacher List: ', error);
        }
        
    }

    useEffect(() => {
        loadFavoritos();
    }, [favoritesTeachers]);
     
    function handleToggleFiltersVisible(){
        setIsFiltersVisible(!isFiltersVisible);
    }

    function doNotReturnYourself(resp: any){
        const users = resp.filter((user: any) => (
            user.id !== id
        ))
        
        return users;
    }

    async function handleFiltersSubmit(){

        try{
            loadFavoritos();

            const response = await api.get('classes', {
                params: {
                    subject,
                    week_day,
                    time,
                },
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })  

            
            const proffys = doNotReturnYourself(response.data);
            
            setIsFiltersVisible(false);
            setTeachers(proffys);

        }        
        catch(err){
            console.log('Deu ruim: ', err);
        }
    }
    

    return(
        <View style={styles.container}>
            <PageHeader 
            title="Professores disponíveis" 
            headerRight={(
                <BorderlessButton onPress={handleToggleFiltersVisible}>
                    <Feather name="filter" size={20} color="#FFF" />
                </BorderlessButton>
            )}>
             
                { isFiltersVisible && (
                   
                   <View style={styles.searchForm}>
                        <Text style={styles.label}>Matéria</Text>
                        <TextInput 
                            style={styles.input}
                            placeholder="Qual matéria está procurando?"
                            placeholderTextColor="#c1bccc"

                            value={subject}
                            onChangeText={(text) => setSubject(text)}
                        />
                      
                        <View style={styles.inputGroup} >
                           
                            <View style={styles.inputBlock}>
                                <Text style={styles.label}> Dia da semana </Text>
                                <TextInput
                                style={styles.input}
                                placeholder="Digite o dia"
                                placeholderTextColor="#c1bccc"

                                value={week_day}
                                onChangeText={(text) => setWeek_day(text)}
                                />
                            </View>

                            <View style={styles.inputBlock}>
                                <Text style={styles.label}> Horário </Text>
                                <TextInput
                                style={styles.input}
                                placeholder="Exemplo: 07:00"
                                placeholderTextColor="#c1bccc"

                                value={time}
                                onChangeText={(text) => setTime(text)}
                                />
                            </View>

                        </View>

                        <RectButton onPress={handleFiltersSubmit} style={styles.submitButton}>
                            <Text style={styles.submitButtonText}>
                                Filtrar
                            </Text>
                        </RectButton>
                    </View>
                )}

            </PageHeader>

            <FlatList
                style={styles.teacherList}
                contentContainerStyle={{
                    paddingHorizontal: 16,
                    paddingBottom: 16
                }}
                data={teachers}
                keyExtractor={( item: Teacher) => `${item.id}`}
                renderItem={ ({ item }) => (
                    <TeacherItem 
                        key={`${item.id}`}
                        teacher={item}
                        route={{ id, auth, token }}
                        favorited={favoritesTeachers.includes(item.id)}
                    />
                ) } 
            />                    
        </View>
    )
}

export default TeacherList; 


//1.0 version
{/* { <ScrollView 

style={styles.teacherList}
contentContainerStyle={{
    paddingHorizontal: 16,
    paddingBottom: 16
}}
>
    {teachers.map((teacher : Teacher )=> {
        return (<TeacherItem 
            key={teacher.id}
            teacher={teacher}
            route={{ id, auth, token }}
            favorited={favoritesTeachers.includes(teacher.id)}
        />)
    })}
</ScrollView> } */}