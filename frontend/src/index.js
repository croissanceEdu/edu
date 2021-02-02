import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router,Route,Redirect,Switch } from 'react-router-dom'
import "react-toastify/dist/ReactToastify.css"
import { ToastContainer } from 'react-toastify';


// import "./assets/bootstrap-material-design-font/css/material.css"
// import "./assets/tether/tether.min.css"
// import "./assets/bootstrap/css/bootstrap.min.css"
// import "./assets/animate.css/animate.min.css"
// import "./assets/dropdown/css/style.css"
// import "./assets/theme/css/style.css"
// import "./assets/theme/css/font-awesome.min.css"
// import "./assets/mobirise/css/mbr-additional.css" 
// import "./assets/bootstrap/css/w3.css"

 import "bootstrap/dist/css/bootstrap.min.css"



import Activate from './components/screens/activate.screen';
import Register from './components/screens/register.screen';
import Login from './components/screens/login.screen';
import JoinClass from './components/screens/join-class.screen';
import StudentHome from './components/screens/student-home.screen';
import SyllabusList from './components/screens/syllabus.list.screen';
import Feedback from './components/screens/feedback.screen'
import SyllabusAdd from './components/screens/syllabus-add.screen';
import StudentMapEdit from './components/student-map-edit.component';
import ChangePassword from './components/screens/change-password.screen';
import CreateDefaults from './components/screens/create-defaults.screen';
import ManageComponent from './components/screens/manage.screen';









require('dotenv').config();



ReactDOM.render(
  <Router>
    <ToastContainer></ToastContainer>
    
    
    <Switch>
      <Route path='/' exact render={props=><StudentHome{...props}/>}/>
      <Route path='/register' exact render={props=><Register{...props}/>}/>
      <Route path='/login' exact render={props=><Login{...props}/>}/>
      <Route path='/user/activate/:token' exact render={props=><Activate{...props}/>}/>
      <Route path='/joinclass' exact render={props=><JoinClass{...props}/>}/>
      <Route path='/syllabus' exact render={props=><SyllabusList{...props}/>}/>
      <Route path='/feedback' exact render={props=><Feedback{...props}/>}/>
      <Route path='/syllabusadd' exact render={props=><SyllabusAdd{...props}/>}/>
      <Route path='/manage' exact render={props=><ManageComponent{...props}/>}/>
      <Route path="/classlinkedit/:id"  exact render={props=><StudentMapEdit{...props}/>}/>
      <Route path="/changepassword"  exact render={props=><ChangePassword{...props}/>}/>
      <Route path="/user/create/new/admin"  exact render={props=><CreateDefaults{...props}/>}/>

    </Switch>
  </Router>,
  document.getElementById('root')
);
