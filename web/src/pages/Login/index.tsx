import React, { useState, useEffect } from 'react';

import './styles.css';
import { useHistory } from "react-router-dom";

import api from '../../services/api';

function Login(){
   
    const history = useHistory();
   
    const [ email, setEmail ] = useState('');
    const [ senha, setSenha ] = useState('');


    useEffect(() => {
        api.get('/logout');
        localStorage.clear();
    }, []);

    async function handleSubmit(event: any){

        event.preventDefault();

        try{

           
            const loginInfo = await api.post('/login', {
                email: email,
                password: senha
            } 
            )

            const { id, auth, token } = loginInfo.data;

            const userDatasToKeepLogged = {
                id,
                token,
                auth
            }

            localStorage.setItem('user', JSON.stringify(userDatasToKeepLogged));

            if(auth)
                history.push('/landing');    
            else
                alert('Try again!')    
        
        }
        catch(error){
            alert('Incorrect email or password');
        }
        
    }

    function handleForgotPassword(){
        history.push('/forgotpass');
    }

    function handleSignUp(){
        history.push('/signup');
    }

    return(
        <div className="login-container">
            <h1>Fazer login</h1>
            <form onSubmit={handleSubmit} className="form-container">
                <input 
                type="email" 
                name="email" 
                placeholder="E-mail" 
                value={email}
                onChange={e => setEmail(e.target.value)}
                />
               
                <input 
                type="current-password" 
                name="password" 
                placeholder="Senha" 
                value={senha}
                onChange={e => setSenha(e.target.value)}
                />

                    <div className="forgot-password-box">
                        <input type="checkbox"/>
                        <p>Lembrar-me.</p>
                        <button className="forgot-button" onClick={handleForgotPassword}>Esqueci minha senha.</button>
                    </div> 
                    
                    <button type="submit">Entrar</button>

            </form>

            <footer className="login-footer">
                <div className="box1">
                        <p>Não tem conta?</p>
                        <button onClick={handleSignUp} >Cadastre-se</button>
                </div>
            
                <p>É de graça</p>
            
            </footer>

        </div>
    )
}

export default Login;