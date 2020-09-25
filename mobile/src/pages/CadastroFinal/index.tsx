import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { View, Text, AsyncStorage } from 'react-native';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import PageHeader from '../../components/PageHeader';

import styles from  './styles';

import api from '../../services/api';

function ConcluirCadastro({ route }: any){

    //const { name, lastName } = params;
    const { name, lastName} = route.params;

    const [ email, setEmail] = useState('');
    const [ senha, setSenha] = useState('');

    const { navigate } = useNavigation();

    async function handleEnter(event: any){
        
        try{
            const response = await api.post('/signup', {
                account_name: name,
                last_name: lastName,
                email,
                password: senha
            })

            const { id, token, auth } = response.data;

            const userDatasToKeepLogged = {
                auth,
                id,
                token,
            }

            AsyncStorage.setItem('user', JSON.stringify(userDatasToKeepLogged));
            
            navigate('CadastroConcluido');
        }
        
        catch(error){
            console.log(error);
            navigate('Cadastro');
        }
        
    }
    

    return(
        <View style={styles.container}>
            
            <PageHeader
                title="">
                <Text></Text> 
                <Text></Text>
                <Text></Text>
            </PageHeader>

            <Text style={styles.inputTitle}>02. Email e Senha</Text>
            <View style={styles.inputGroup}>
                <TextInput
                    autoFocus={true}
                    style={styles.emailText}
                    placeholder="E-mail"
                    value={email}
                    onChangeText={text => setEmail(text)}>
                        
                    </TextInput>

                <TextInput
                    style={styles.senhaText}
                    placeholder="Senha"
                    value={senha}
                    secureTextEntry={true}
                    onChangeText={text => setSenha(text)}>
                </TextInput>

            </View>

            <TouchableOpacity onPress={handleEnter} style={styles.enterButton}>
                <Text style={styles.enterText}>Concluir cadastro</Text>
            </TouchableOpacity>

        </View>
    )
}

export default ConcluirCadastro;

