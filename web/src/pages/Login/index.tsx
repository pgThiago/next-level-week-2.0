import React, { useState, useEffect } from 'react';

import './styles.css';
import { useHistory } from "react-router-dom";

import api from '../../services/api';

function Login(){
   
    const history = useHistory();
   
    const [ email, setEmail ] = useState('');
    const [ senha, setSenha ] = useState('');

    const [ check, setCheck ] = useState(false);

    function handleCheckBox(){
        setCheck(!check)
    }

    useEffect(() => {
        try{
            const user = localStorage.getItem('user');
            
            const userAsObject = JSON.parse(`${user}`);
            const { auth } = userAsObject;
            console.log(userAsObject.id);
            if(auth){
                history.push('/landing')
            }
            else{
                history.push('/');
            }
        }
        catch(error){
            history.push('/');
        }
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
                auth,
                email,
                password: senha
            }

            const userDatasToNotKeepLogged = {
                id,
                token,
                auth,
            }

            if(check && auth){
                localStorage.setItem('user', JSON.stringify(userDatasToKeepLogged));
                history.push('/landing');
            }
            else if(!check && auth){
                localStorage.setItem('user', JSON.stringify(userDatasToNotKeepLogged));
                history.push('/landing');
            }
            else{
                alert('Try again!');
            }        
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
                        <input type="checkbox" defaultChecked={check} onChange={handleCheckBox} />
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