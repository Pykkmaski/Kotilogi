import Header from '../Header/Header';
import Home from '../Home/Home';
import Login from '../Login/Login';
import Signup from '../Signup/Signup';
import Unknown from '../Unknown/Unknown.js';
import RegisterThankYou from '../RegisterThankYou/RegisterThankYou';
import AppContext from '../Contexts/AppContext';
import User from '../User/User';
import Event from '../Property/Event/Event';
import {HashRouter as Router, Routes, Route} from 'react-router-dom';
import './Style.scss';
import { useState, useEffect } from 'react';
import Property from '../Property/Property.js';
import Energy from '../Energy/Energy';
import {serviceName} from '../appconfig';
import Pricing from '../Pricing/Pricing';
import axios from 'axios';

const {userStorageName} = require('../appconfig');

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