import React, { useState } from 'react';

import './styles.css';
//import { Link } from 'react-router-dom';
import PageHeader from '../../components/PageHeader';
import { useHistory } from "react-router-dom";
import api from '../../services/api';

function Cadastro(){

    const history = useHistory();

    const [ account_name, setNome ] = useState('');
    const [ last_name, setSobrenome ] = useState('');
    const [ email, setEmail ] = useState('');
    const [ password, setSenha ] = useState('');

    async function handleSubmit(event: any){
        event.preventDefault();
        try{
            const response = await api.post('/signup', {
                account_name,
                last_name,
                email,
                password
            })
            const { identiUser, token } = response.data;
            console.log(response.data);
            localStorage.setItem('id', identiUser);
            localStorage.setItem('token', token);
            history.push('/',  response.data);
        }
        catch(error){
            history.push('/signup')
        }
        
    }

    return(
        <div className="signup-container">
            <header>
                <PageHeader
                    title="Cadastro"
                    description="Preencha os dados abaixo para começar."
                />
            </header>    
            
            <form className="form-signup-container" onSubmit={handleSubmit}>
                <input 
                name="nome" 
                type="text" 
                placeholder="Nome"
                value={account_name}
                onChange={e => setNome(e.target.value)}
                
                />
               
                <input 
                name="sobrenome" 
                type="text" 
                placeholder="Sobrenome"
                value={last_name}
                onChange={e => setSobrenome(e.target.value)}
                
                />
               
                <input 
                name="email" 
                type="email" 
                placeholder="E-mail"
                value={email}
                onChange={e => setEmail(e.target.value)}
                />
                
                <input 
                name="senha" 
                type="current-password" 
                placeholder="Senha"
                value={password}
                onChange={e => setSenha(e.target.value)}
                
                />

                <button type="submit">Concluir cadastro</button>

            </form>
        </div>
    )
}

export default Cadastro;