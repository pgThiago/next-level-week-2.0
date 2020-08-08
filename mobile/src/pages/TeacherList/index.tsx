import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { ScrollView, TextInput, BorderlessButton, RectButton } from 'react-native-gesture-handler';
import { useFocusEffect } from '@react-navigation/native';

import AsyncStorage from '@react-native-community/async-storage';

import styles from './styles';
import PageHeader from '../../components/PageHeader';
import TeacherItem, { Teacher } from '../../components/TeacherItem';


import { Feather } from '@expo/vector-icons';
import api from '../../services/api';

function TeacherList(){

    const [isFiltersVisible, setIsFiltersVisible] = useState(false);

    const [ teachers, setTeachers ] = useState([]);
    const [ favoritesTeachers, setFavoritesTeachers ] = useState<number[]>([]);

    const [ subject, setSubject ] = useState('');
    const [ week_day, setWeek_day ] = useState('');
    const [ time, setTime ] = useState('');

    function loadFavorites(){
        AsyncStorage.getItem('favorites').then(response => {
            if(response){
                const favoritedTeachers = JSON.parse(response);
                const favoritesTeachersIds = favoritedTeachers.map((teacher: Teacher) => teacher.id)
                setFavoritesTeachers(favoritesTeachersIds);
            }
        });
    }

    useFocusEffect(
        React.useCallback(() => {
          loadFavorites();
        }, [favoritesTeachers])
    )

    function handleToggleFiltersVisible(){
        setIsFiltersVisible(!isFiltersVisible);
    }

    async function handleFiltersSubmit(){
       
        loadFavorites();

        const response = await api.get('classes', {
            params: {
                subject,
                week_day,
                time,
            }
        })
        setIsFiltersVisible(false);
        setTeachers(response.data);
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
            
            <ScrollView 
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
                        favorited={favoritesTeachers.includes(teacher.id)}
                    />)
                })}
            </ScrollView>
        </View>
    )
}

export default TeacherList;