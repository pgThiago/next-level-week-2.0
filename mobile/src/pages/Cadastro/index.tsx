import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import PageHeader from '../../components/PageHeader';

import styles from  './styles';


function Cadastro(){

    const [ name, setName] = useState('');
    const [ lastName, setLastName] = useState('');

    const { navigate } = useNavigation()

    async function handleEnter(){       
        navigate('CadastroFinal', {
            name,
            lastName
        })        
    }

    return(
        <View style={styles.container}>
            
            <PageHeader
                title="Crie sua conta gratuíta">
                <Text style={{ fontSize: 16, color: '#fff' }}>Basta preencher esses dados</Text> 
                <Text style={{ fontSize: 16, color: '#fff' }}>e você estará conosco.</Text>
            </PageHeader>

            <Text style={styles.inputTitle}>01. Quem é você?</Text>
            <View style={styles.inputGroup}>
                <TextInput
                    autoFocus={true}
                    style={styles.nameText}
                    placeholder="Nome"
                    value={name}
                    onChangeText={text => setName(text)}>
                        
                    </TextInput>

                <TextInput
                    style={styles.lastNameText}
                    placeholder="Sobrenome"
                    value={lastName}
                    onChangeText={text => setLastName(text)}>
                </TextInput>

            </View>

            <TouchableOpacity onPress={handleEnter} style={styles.enterButton}>
                <Text style={styles.enterText}>Próximo</Text>
            </TouchableOpacity>

        </View>
    )
}

export default Cadastro;

