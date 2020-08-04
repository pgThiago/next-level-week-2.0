import React from 'react';

// My imports
import './styles.css';
import whatsappIcon from '../../assets/images/icons/whatsapp.svg'


function TeacherItem(){
    return(
        <article className="teacher-item">
            <header>
                <img src="https://avatars0.githubusercontent.com/u/48173784?s=460&u=470bec2e5deab6f808308e7230c1c52b59579c41&v=4" alt="Foto"/>
                <div>
                    <strong>Nome do professor</strong>
                    <span>Aulas de Mandarim</span>
                </div>
            </header>

            <p>Texto sobre o professor</p>

            <footer>
                <p>

                    <h2>Preço/hora <strong>R$ 2</strong></h2>

                </p>
                <button type="button"> 
                    <img src={whatsappIcon} alt="Entrar em contato"/>
                </button>
            </footer>
        </article>
    )
}
export default TeacherItem;