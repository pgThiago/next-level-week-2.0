import React from 'react';

import { Link } from 'react-router-dom';

// My imports
import logoImg from '../../assets/images/logo.svg';
import backIcon from '../../assets/images/icons/back.svg';

import './styles.css';

interface PageHeaderProps{
    title: string;
    description?: string;
}

const PageHeader: React.FC<PageHeaderProps> = (props) => {
    return(
        <header className="page-header">
                
            <div className="top-bar-container">
                <Link to="/landing">
                    <img id="back-icon" src={backIcon} alt="Voltar"/>
                </Link>
                <img id="logo-img" src={logoImg} alt="Proffy"/>
            </div>

            <div className="header-content">
                <strong>{props.title}</strong>
                        {props.children}
                        { props.description && <p>{props.description}</p> }
            </div>           
        </header>
    )
}

export default PageHeader;