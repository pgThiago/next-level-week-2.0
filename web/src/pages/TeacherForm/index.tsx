import React, { useState, FormEvent, useEffect } from 'react';

// My imports
import './styles.css';
import PageHeader from '../../components/PageHeader';
import Input from '../../components/Input';
import TextArea from '../../components/TextArea';
import Select from '../../components/Select';
import warningIcon from '../../assets/images/icons/warning.svg';
import api from '../../services/api';
import { Link, useHistory } from 'react-router-dom';

function TeacherForm() {

    const history = useHistory();

    const [ name, setName ] = useState('');
    const [ avatar, setAvatar ] = useState('');
    const [ whatsapp, setWhatsapp ] = useState('');
    const [ bio, setBio ] = useState('');
    
    const [ subject, setSubject ] = useState('');
    const [ cost, setCost ] = useState('');

    const [ scheduleItems, setScheduleItems ] = useState([
        { week_day: 0, from: '', to: '' }
    ]);

    const [ id, setId ] = useState(null);
    const [ token, setToken ] = useState('');
    const [ auth, setAuth ] = useState(false);

    const user = localStorage.getItem('user');
    console.log(user);

    useEffect(() => {
        try{
            const user = localStorage.getItem('user');
            const userString = `${user}`
            const userInformation = JSON.parse(userString);
            const { id, token, auth } = userInformation;
    
            setId(id);
            setToken(token);
            setAuth(auth);
    
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

    async function handleCreateClass(e: FormEvent){
        
        const userInfo = await api.get('/profile', {
            params: {
                id
            },                  
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        
        if(userInfo.data.length === 0){
            e.preventDefault();
            await api.post('classes', {
                name, 
                avatar, 
                whatsapp, 
                bio, 
                subject, 
                cost: Number(cost), 
                schedule: scheduleItems
            },{
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                params: {
                    id
                }
            }).then(() => {
                history.push('/profile')
            })
            .catch((error) => console.log('Erro no TeacherForm: ', error));
        }
        else{
            alert('Não é possível cadastrar-se mais de uma vez.');
            history.push('/profile');
        }
    }

    return (
        <div id="page-teacher-form" className="container" >
            <PageHeader
                title="Que incrível que você quer dar aulas."
                description="O primeiro passo é preencher esse formulário de inscrição"
            />
            <header className="teacher-form-header">
                <Link to="/landing" className="home">Home</Link>
                <Link to="/" className="log-out">Sair</Link>
            </header>
            <main>
                <form onSubmit={handleCreateClass}>
                    <fieldset>
                        <legend>Seus dados</legend>

                        <Input 
                        name="name" 
                        label="Nome completo" 
                        value={name}
                        onChange={(e => setName(e.target.value))}
                        />
                    
                        <Input 
                        name="avatar" 
                        label="Avatar" 
                        value={avatar}
                        onChange={(e => setAvatar(e.target.value))}
                        />
                    
                        <Input 
                        name="whatsapp" 
                        label="WhatsApp" 
                        value={whatsapp}
                        onChange={(e => setWhatsapp(e.target.value))}
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
                        <button type="submit">Salvar cadastro</button>
                    </footer>
                </form>
            </main>


        </div>
    );
}

export default TeacherForm;