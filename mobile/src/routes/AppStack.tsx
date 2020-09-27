import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const { Navigator,Screen } = createStackNavigator();

import Login from '../pages/Login';
import Cadastro from '../pages/Cadastro';
import CadastroFinal from '../pages/CadastroFinal';
import CadastroConcluido from '../pages/CadastroConcluido';
import ForgotPassword from '../pages/ForgotPassword';
import NewPassword from '../pages/NewPassword';
import Landing from '../pages/Landing';
import TeacherProfile from '../pages/TeacherProfile';
import GiveClasses from '../pages/GiveClasses';
import StudyTabs from './StudyTabs';

function AppStack(){
    return (
        <NavigationContainer>
            <Navigator screenOptions={{ headerShown: false } } >

                <Screen name='Login' component={Login}/>
                <Screen name='Landing' component={Landing}/>
                <Screen name='ForgotPassword' component={ForgotPassword}/>
                <Screen name='NewPassword' component={NewPassword}/>
                <Screen name='TeacherProfile' component={TeacherProfile}/>
                <Screen name='GiveClasses' component={GiveClasses}/>
                <Screen name='Study' component={StudyTabs}/>
                <Screen name='Cadastro' component={Cadastro}/>
                <Screen name='CadastroFinal' component={CadastroFinal}/>
                <Screen name='CadastroConcluido' component={CadastroConcluido}/>

            </Navigator>
        </NavigationContainer>  
    );
}

export default AppStack;