import React, { useState, useEffect } from 'react';

import './styles.css';
import PageHeader from '../../components/PageHeader';

import api from '../../services/api';
import { useHistory } from 'react-router-dom';

function NewPassword(props: any){

    const [ senha, setSenha ] = useState('');
    const [ current_senha, setCurrent_senha ] = useState('');
    const [ token, setToken ] = useState('');
    const [ email, setEmail ] = useState('');

    useEffect(() => {
        const { email } = props.location.state;
        setEmail(email);
    }, []);

    const  history = useHistory();
    
    async function handleSubmit(event: any){
        event.preventDefault();
        
        try{
            if(senha === current_senha){
                const response = await api.post('/reset_password', { 
                    token: token, password: senha 
                },{
                    params: {
                        email
                    }
                });
                alert("E-mail enviado");
                history.push('/');
            }
            else{
                alert('Senhas não batem')
                history.push('/forgotpass');
            }
            
        }
        catch(error){
            alert('Tente novamente com mais atenção fela da .');
        }
    }

    return(
        <div className="forgot-new-password-container">
            <header>
                <PageHeader
                    title="Vamos redefinir sua senha."
                    description="Digite sua nova senha abaixo"
                />
            </header>    
            
            <form className="form-forgot-password-container" onSubmit={handleSubmit}>

               <input 
                type="text" 
                placeholder="Token que chegou no seu e-mail"
                name="token"
                value={token}
                onChange={e => setToken(e.target.value)}
                />
                
                <input 
                type="current-password" 
                placeholder="Nova senha"
                name="password"
                value={senha}
                onChange={e => setSenha(e.target.value)}
                />

                <input 
                type="current-password" 
                placeholder="Confirmar senha"
                name="password"
                value={current_senha}
                onChange={e => setCurrent_senha(e.target.value)}
                />
                <button type="submit">Enviar</button>

            </form>
        </div>
    )
}

export default NewPassword;