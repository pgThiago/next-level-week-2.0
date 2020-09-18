import React, { useState, useEffect } from 'react';

import { Link, useHistory } from 'react-router-dom';

// My imports
import logoImg from '../../assets/images/logo.svg';
import landingImg from '../../assets/images/landing.svg';
import studyIcon from '../../assets/images/icons/study.svg';
import giveClassesIcon from '../../assets/images/icons/give-classes.svg';
import purpleHeartIcon from '../../assets/images/icons/purple-heart.svg';

import './styles.css';

import api from '../../services/api';

function Landing(){

    const history = useHistory();

    const [ totalConnections, setTotalConnections ] = useState(0);
    const [ token, setToken ] = useState('');

    useEffect(() => {
        try{
            const user = localStorage.getItem('user');
            const userString = `${user}`
            const userInformation = JSON.parse(userString);
            const { token, auth } = userInformation;
            setToken(token);
            if(!auth)
                history.push('/');
            
            api.get('connections', { headers: { 'Authorization': `Bearer ${token}` } }).then(response => {
                const { total } = response.data;
                setTotalConnections(total);
            })
        }
        catch(error){
            history.push('/');        }
        
    }, [token]);

    return (
        <div id="page-landing">
            <header className="landing-header">
                <Link to="/profile" className="profile">Meu perfil</Link>
                <Link to="/" className="log-out">Sair</Link>
            </header>
            <div id="page-landing-content" className="container">
                <div className="logo-container">
                    <img src={logoImg} alt="Proffy"/>
                    <h2>Sua plataforma de estudos online.</h2>
                </div>
                <img 
                    src={landingImg} 
                    alt="plataforma de estudos" 
                    className="hero-image" 
                />

                <div className="buttons-container">
                    <Link to="/study" className="study">
                        <img src={studyIcon} alt="Estudar"/>
                        Estudar
                    </Link>
                    <Link to="/give-classes" className="give-classes">
                        <img src={giveClassesIcon} alt="Dar aulas"/>
                        Dar aulas
                    </Link>
                </div>
                
                <span className="total-connections">
                    Total de {totalConnections} conexões já realizadas <img src={purpleHeartIcon} alt="Coração roxo"/>
                </span>
                
            </div>
        </div>        
    )
}

export  default Landing;