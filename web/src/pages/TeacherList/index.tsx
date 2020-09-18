import React, { useState, FormEvent, useEffect } from 'react';

// My imports
import PageHeader from '../../components/PageHeader';
import TeacherItem, { Teacher } from '../../components/TeacherItem';
import Input from '../../components/Input';
import Select from '../../components/Select';

import './styles.css';
import api from '../../services/api';
import { Link, useHistory } from 'react-router-dom';

function TeacherList() {

    const history = useHistory();

    const [ teachers, setTeachers ] = useState([])

    const [ subject, setSubject ] = useState('');
    const [ week_day, setWeekDay ] = useState('');
    const [ time, setTime ] = useState('');

    const [ id, setId ] = useState(null);
    const [ token, setToken ] = useState('');
    const [ auth, setAuth ] = useState(false);

    useEffect(() => {
        try{
            const user = localStorage.getItem('user');
            const userString = `${user}`
            const userInformation = JSON.parse(userString);
            const { id, token, auth } = userInformation;
    
            setId(id);
            setToken(token);
            setAuth(auth);
            console.log(auth);
    
            if(!auth || !token)
                history.push('/');
        }
        catch(error){
            history.push('/');
        }
    }, []);

   

    async function searchTeachers(e: FormEvent){
        e.preventDefault();

        const response = await api.get('classes', {
            params: {
                subject,
                week_day,
                time
            },
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })

        setTeachers(response.data)
    }

    return (

        <div id="page-teacher-list" className="container">
            <PageHeader title="Estes são os professores disponíveis">
            <header className="landing-header">
                <Link to="/landing" className="home">Home</Link>
                <Link to="/profile" className="profile">Meu perfil</Link>
                <Link to="/" className="log-out">Sair</Link>
            </header>

                <form id="search-teachers" onSubmit={searchTeachers}>

                    <Select
                        name="subject"
                        label="Matéria"
                        value={subject}
                        onChange={e => setSubject(e.target.value)}
                        options={[
                            { value: 'Assembly', label: 'Assembly' },
                            { value: 'C', label: 'C' },
                            { value: 'C++', label: 'C++' },
                            { value: 'Java', label: 'Java' },
                            { value: 'Python', label: 'Python' },
                            { value: 'JavaScript', label: 'JavaScript' },
                        ]}
                    />      
                    <Select
                        name="week_Day"
                        label="Dia da semana"
                        value={week_day}
                        onChange={e => setWeekDay(e.target.value)}
                        options={[
                            { value: '0', label: 'Domingo' },
                            { value: '1', label: 'Segunda' },
                            { value: '2', label: 'Terça' },
                            { value: '3', label: 'Quarta' },
                            { value: '4', label: 'Quinta' },
                            { value: '5', label: 'Sexta' },
                            { value: '6', label: 'Sábado' },
                        ]}
                    />

                    <Input 
                    name="time" 
                    label="Hora" 
                    value={time}
                    onChange={e => setTime(e.target.value)}
                    />

                <button type="submit">Buscar</button>   
                </form>


            </PageHeader>

            <main>
            {
                teachers.map((teacher: Teacher) => {
                    return  <TeacherItem key={teacher.id} teacher={teacher} />
                })
            }
        
            </main>
        </div>
    );
}

export default TeacherList;