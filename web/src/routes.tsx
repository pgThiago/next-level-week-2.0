import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

// My imports
import Landing from './pages/Landing';
import TeacherList from './pages/TeacherList';
import TeacherForm from './pages/TeacherForm';
import Login from './pages/Login';
import Cadastro from './pages/Cadastro';
import ForgotPassword from './pages/ForgotPassword';
import NewPassword from './pages/NewPassword';
import TeacherProfile from './pages/TeacherProfile';

function Routes(){
    return(
        <BrowserRouter>
        
            <Route path="/" exact component={Login}/>
            <Route path="/signup" component={Cadastro}/>
            <Route path="/forgotpass" component={ForgotPassword}/>
            <Route path="/newpassword" component={NewPassword}/>
            <Route path="/profile" component={TeacherProfile}/>
            <Route path="/landing" component={Landing}/>
            <Route path="/study" component={TeacherList}/>
            <Route path="/give-classes" component={TeacherForm}/>

        </BrowserRouter>
    );
}

export default Routes;