import React, { useState, FormEvent, useEffect } from 'react';

import { Link, useHistory } from 'react-router-dom';


// My imports
import './styles.css';
import ProfileHeader from '../../components/ProfileHeader';
import Input from '../../components/Input';
import TextArea from '../../components/TextArea';
import Select from '../../components/Select';
import warningIcon from '../../assets/images/icons/warning.svg';

import api from '../../services/api';

import convertMinutesToHours from '../../utils/convertMinutesToHours';
import getMinutes from '../../utils/getMinutes';

function TeacherProfile() {

    const history = useHistory();

    const [ avatar, setAvatar ] = useState('');
    const [ name, setName ] = useState('');
    const [ last_name, setLastName ] = useState('');
    const [ email, setEmail ] = useState('');
    const [ whatsapp, setWhatsapp ] = useState('');
    const [ bio, setBio ] = useState('');
    
    const [ week_day, setWeekDay ] = useState('');
    const [ from, setFrom ] = useState('');
    const [ to, setTo ] = useState('');
    
    const [ subject, setSubject ] = useState('');
    const [ cost, setCost ] = useState('');

    const [ scheduleItems, setScheduleItems ] = useState([
        { week_day: 0, from: '', to: ''  }
    ]);

    const [ id, setId ] = useState(null);
    const [ token, setToken ] = useState('');

    useEffect(() => {
        try{
            const user = localStorage.getItem('user');
            const userString = `${user}`
            const userInformation = JSON.parse(userString);
            const { id, token, auth } = userInformation;
    
            setId(id);
            setToken(token);
    
            if(!auth || !token)
                history.push('/');
        }
        catch(error){
            history.push('/');
        }
    }, []);

    function addNewScheduleItem(){
        setScheduleItems([
            ...scheduleItems,
        ])
    }

    function setScheduleItemValue(position: number, field: string, value: string){
        const updatedScheduleItems = scheduleItems.map((scheduleItem, index) => {
            if (index === position){
                return { ...scheduleItem, [field]: value };
            } 
            
            return scheduleItem;
        })
        setScheduleItems(updatedScheduleItems);
    }


    async function handleUpdateProfile(e: FormEvent){
        e.preventDefault();
        try{
            
            await api.post('update', {
                name,
                last_name,
                whatsapp,
                bio,
                cost,
                avatar,
                subject,
                week_day,
                from,
                to
            },{
                params: { id },
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            },
            );
            alert('Atualizado!');

        }
        catch(error){
            console.log('Deu pau na atualização do perfil: ', error);
        }
    }

    // My functions ( from the challenges - 2.0 version )

    useEffect(() => {
    
        async function getProffyDatas(){
            try{
                const user = localStorage.getItem('user');
                const userString = `${user}`
                const userInformation = JSON.parse(userString);
                const { id, token, auth } = userInformation;
                if(!token){
                    alert('Você precisa se cadastrar primeiro');
                    history.push('/give-classes');
                }
                const userInfo = await api.get('/profile', {
                    params: {
                        id
                    },                  
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                if(userInfo.data.length === 0){
                    alert('Você precisa ser um professor para ter um perfil.')
                    history.push('/landing');
                }

                const { avatar, name, last_name, email, whatsapp, bio, week_day, subject, cost, from, to } = userInfo.data[0];
               
                setAvatar(avatar);
                setName(name);
                setLastName(last_name);
                setEmail(email);
                setWhatsapp(whatsapp);
                setBio(bio);
                setSubject(subject);
                setCost(cost);
                
                let fromHours = convertMinutesToHours(from);
                let fromMinutes = getMinutes(from);
                let fromTime = `${fromHours}:${fromMinutes}`;

                if(fromTime.length < 5){
                   
                    let fromTimeSplit = fromTime.split(':');
                   
                    if(fromTimeSplit[0].length === 1 && fromTimeSplit[1].length === 1){
                        fromTime = `0${fromHours}:${fromMinutes}0`;
                    }
                    
                    if(fromTimeSplit[0].length === 2 && fromTimeSplit[1].length === 1){
                        fromTime = `${fromHours}:${fromMinutes}0`;
                    }

                    if(fromTimeSplit[0].length === 1 && fromTimeSplit[1].length === 2){
                        fromTime = `0${fromHours}:${fromMinutes}`;
                    }
                   

                }


                let toHours = convertMinutesToHours(to);
                let toMinutes = getMinutes(to);
                let toTime = `${toHours}:${toMinutes}`;

                if(toTime.length < 5){
                   
                    let toTimeSplit = toTime.split(':');
                    
                    if(toTimeSplit[0].length === 1 && toTimeSplit[1].length === 1)
                        toTime = `0${toHours}:${toMinutes}0`;
                    
                    if(toTimeSplit[0].length === 2 && toTimeSplit[1].length === 1)
                        toTime = `${toHours}:${toMinutes}0`;

                    if(toTimeSplit[0].length === 1 && toTimeSplit[1].length === 2)
                        toTime = `0${toHours}:${toMinutes}`;

                }
                setWeekDay(week_day);
                setFrom(fromTime);
                setTo(toTime);
                                
                scheduleItems.map((scheduleItem, index) => {
                    scheduleItem.week_day = week_day;
                    scheduleItem.from = fromTime;
                    scheduleItem.to = toTime;
                    setScheduleItemValue(index, 'week_day', week_day);
                    setScheduleItemValue(index, 'from', fromTime);
                    setScheduleItemValue(index, 'to', toTime);
                    return true;
                });
                                
            }
            catch(error){
                history.push('/landing');
            }
        }
        getProffyDatas();
    }, [history]);

    return (
        <div id="page-teacher-profile" className="container" >
            <ProfileHeader
                link={avatar}
                name={name}
                subject={subject}
            />
            <header className="landing-header">
                <Link to="landing" className="home">Home</Link>
                <Link to="/" className="log-out">Sair</Link>
            </header>
            <main>
                <form onSubmit={handleUpdateProfile}>
                    <fieldset>
                        <legend>Seus dados</legend>

                        <Input 
                        name="name" 
                        label="Nome" 
                        value={name}
                        onChange={(e => setName(e.target.value))}
                        />
                    
                        <Input 
                        name="last_name" 
                        label="Sobrenome" 
                        value={last_name}
                        onChange={(e => setLastName(e.target.value))}
                        />

                        <Input 
                        name="email" 
                        label="E-mail" 
                        value={email}
                        onChange={(e => setEmail(e.target.value))}
                        />
                    
                        <Input 
                        name="whatsapp" 
                        label="WhatsApp" 
                        value={whatsapp}
                        onChange={(e => setWhatsapp(e.target.value))}
                        />

                        <Input 
                        name="avatar" 
                        label="avatar" 
                        value={avatar}
                        onChange={(e => setAvatar(e.target.value))}
                        />

                        <TextArea 
                        name="biografia" 
                        label="Biografia" 
                        value={bio}
                        onChange={e => setBio(e.target.value)}
                        />

                    </fieldset>

                    <fieldset>

                        <legend>Sobre a aula</legend>

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
                        
                        
                        <Input 
                        name="cost" 
                        label="Custo da sua hora por aula" 
                        value={cost}
                        onChange={e => setCost(e.target.value)}
                        />

                    </fieldset>

                    <fieldset>
                        <legend>
                            Horários disponíveis
                            <button onClick={addNewScheduleItem} type="button"> + Novo horário </button>
                        </legend>

                        {scheduleItems.map((scheduleItem, index) => (
                        <div key={index} className="schedule-item">
                            <Select
                                name="week_day"
                                label="Dia da semana"
                                value={scheduleItem.week_day}
                                onChange={e => setScheduleItemValue(index, 'week_day', e.target.value)}
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
                             name="from"
                             label="Das"
                             type="time"
                             value={scheduleItem.from}
                             onChange={e => setScheduleItemValue(index, 'from', e.target.value)}

                             />

                            
                            <Input 
                             name="to"
                             label="Até"
                             type="time"
                             value={scheduleItem.to} 
                             onChange={e => setScheduleItemValue(index, 'to', e.target.value)}

                             />
                        </div>
                        ))}                     

                    </fieldset>

                    <footer>
                        <p>
                            <img src={warningIcon} alt="Aviso Importante" />
                            Importante! <br />
                            Preencha todos os dados.
                        </p>
                        <button type="submit">Salvar perfil</button>
                    </footer>
                </form>
            </main>


        </div>
    );
}

export default TeacherProfile;