import React from 'react';

import { Link } from 'react-router-dom';

// My imports
import logoImg from '../../assets/images/logo.svg';
import backIcon from '../../assets/images/icons/back.svg';

import './styles.css';

interface ProfileHeaderProps{
    link: string;
    name: string;
    subject: string;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = (props) => {
    return(
        <header className="profile-header">
                
            <div className="profile-top-bar-container">
                <Link to="/landing">
                    <img id="back-icon" src={backIcon} alt="Voltar"/>
                </Link>
                <img id="logo-img" src={logoImg} alt="Proffy"/>
            </div>

            <div className="profile-header-content">
                <img src={props.link} alt="profile"/>
                <p>{props.name}</p>
                <span>{props.subject}</span>
            </div>  

        </header>
    )
}

export default ProfileHeader;