import React from 'react';

// My imports
import './styles.css';
import whatsappIcon from '../../assets/images/icons/whatsapp.svg'
import api from '../../services/api';

export interface Teacher {
    id: number;
    avatar: string;
    bio: string;
    cost: string;
    name: string;
    subject: string;
    whatsapp: string;
};


interface TeacherItemprops {
    teacher: Teacher;
}

const TeacherItem: React.FC<TeacherItemprops> = ({ teacher }) => {

    function createNewConnection(){
        api.post('connections', {
            user_id: teacher.id,
        })
    }

    return(
        <article className="teacher-item">
            <header>
                <img src={teacher.avatar} alt={teacher.name}/>
                <div>
                    <strong>{teacher.name}</strong>
                    <span>{teacher.subject}</span>
                </div>
            </header>

            <p>{teacher.bio}</p>

            <footer>
                <p>
                <h2>Preço/hora <strong>R$ {teacher.cost}</strong></h2>
                </p>
                <a target="_blank" rel="noopener noreferrer" onClick={createNewConnection} href={`https://wa.me/${+5591983659681}`}>
                    <img src={whatsappIcon} alt="Entrar em contato"/>
                        Entrar em contato
                </a>
            </footer>
        </article>
    )
}
export default TeacherItem;