import React, { useState } from 'react';

import './styles.css';
import PageHeader from '../../components/PageHeader';
import { useHistory } from "react-router-dom";
import api from '../../services/api';

function ForgotPassword(){

    const [ email, setEmail ] = useState('');

    const  history = useHistory();

    async function handleSubmit(event: any){
        event.preventDefault();
        try{
            const response = await api.post('/forgot_password', {
                email
            })
            console.log('response.data do componente forgot password:', response.data);
            history.push('/newpassword', response.data)
        }
        catch(error){
            console.log(error);
        }
    }

    return(
        <div className="forgot-password-container">
            <header>
                <PageHeader
                    title="Eita, esqueceu sua senha?"
                    description="Não esquenta. Vamos dar um jeito nisso."
                />
            </header>    
            
            <form className="form-forgot-password-container" onSubmit={handleSubmit}>
                
            <input 
                type="email" 
                placeholder="E-mail"
                name="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
            />
            <button type="submit">Enviar</button>

            </form>
        </div>
    )
}

export default ForgotPassword;