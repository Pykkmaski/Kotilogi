import './scss/main.scss';
import 'bootstrap/scss/bootstrap.scss';

import Header from './Components/Header';
import Home from './Pages/Home';
import Login from './Pages/Login';
import Signup from './Pages/Signup';
import Unknown from './Pages/Unknown.js';
import RegisterThankYou from './Pages/RegisterThankYou';
import AppContext from './Contexts/AppContext';
import User from './Pages/User';
import Event from './Pages/Event';
import {HashRouter as Router, Routes, Route} from 'react-router-dom';
import { useState, useEffect } from 'react';
import Property from './Pages/Property.js';
import Pricing from './Pages/Pricing';
import axios from 'axios';

const {userStorageName} = require('./appconfig');

function App(props){

    const [user, setUser] = useState(() => {
        const user = localStorage.getItem(userStorageName);
        axios.defaults.headers['Authorization'] = 'Bearer ' + user;
        return user || null;
    });

    return (
        <Router>
            <div className="bg-filler"/>
            <div className="app">

                <AppContext.Provider value={{user, setUser}}>
                <Header/>
                    <Routes>
                        <Route exact path="/" element={<Home/>}></Route>
                        <Route exact path="/login" element={<Login/>}></Route>
                        <Route exact path="/register" element={<Signup/>}></Route>
                        <Route exact path="/user/" element={<User/>}></Route>
                        <Route exact path="/pricing" element={<Pricing/>}></Route>
                        <Route exact path="/property/:id/" element={<Property/>}></Route>
                        <Route exact path="/property/:property_id/events/:event_id" element={<Event/>}></Route>
                        <Route exact path="/thankyou" element={<RegisterThankYou/>}></Route>
                        <Route exact path="*" element={<Unknown/>}></Route>
                    </Routes>
                </AppContext.Provider>
            </div> 

        </Router>
        
    );
}

export default App;