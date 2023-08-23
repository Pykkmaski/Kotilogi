import 'bootstrap/scss/bootstrap.scss';
import './scss/main.scss';
import Header from './Components/Header';
import Home from './Pages/Home';
import Login from './Pages/Login';
import Signup from './Pages/Signup';
import Unknown from './Pages/Unknown.js';
import RegisterThankYou from './Pages/RegisterThankYou';
import AppContext from '../contexts/AppContext';
import Properties from './Pages/Properties';
import Event from './Pages/Event/Event';
import {HashRouter as Router, Routes, Route} from 'react-router-dom';
import Property from './Pages/Property/Property';
import Pricing from './Pages/Pricing';
import { tokenStorageKey, userStorageKey } from './appconfig';
import useLocalStorage from './Hooks/useLocalStorage';
import axios from 'axios';
import { useEffect, useState, useRef } from 'react';
import {ResetPassword} from './Pages/ResetPassword/ResetPassword';
import SendActivationCode from './Pages/SendActivationCode';
import TOS from './Pages/TOS/TOS';
import Notice from './Components/Notice';
import Menu from './Components/Menu/Menu';
import Logout from './Pages/Logout';
import { PropertiesGallery } from './Components/Gallery/PropertiesGallery';

function App(){
    const [token, setToken] = useLocalStorage(tokenStorageKey, null);
    const [user, setUser] = useLocalStorage(userStorageKey, null);
  
    axios.defaults.headers['Authorization'] = token;
    
    useEffect(() => {
        axios.defaults.headers['Authorization'] = token;
    }, [token]);

    return (
        <Router basename="/">
            <div className="app">
                <AppContext.Provider value={{token, setToken, user, setUser}}>
                <Menu/>

                <Header/>
                
                    <div className='body'>
                        <Routes>
                            <Route path="/" element={<Home/>}>
                                
                            </Route>

                            <Route path="/login" element={<Login/>}></Route>
                            <Route path="/properties" element={<Properties/>}></Route>
                            <Route path="/register" element={<Signup/>}></Route>
                            <Route path="/tos" element={<TOS/>}></Route>
                            <Route path="/user/" element={<Properties/>}></Route>
                            <Route path="/pricing" element={<Pricing/>}></Route>
                            <Route path="/properties/:property_id/:section" element={<Property/>}></Route>
                            <Route path="/properties/:property_id/events/:event_id" element={<Event/>}></Route>
                            <Route path="/thankyou" element={<RegisterThankYou/>}></Route>
                            <Route path="/reset/password" element={<ResetPassword/>}></Route>
                            <Route path="/send/activationcode" element={<SendActivationCode/>}></Route>
                            
                            <Route path="/logout" element={<Logout/>}></Route>
                            <Route path="*" element={<Unknown/>}></Route>
                        </Routes>
                    </div>
                    <Notice text="Huomio! Sivusto on työn alla, joten siinä saattaa esiintyä virheitä."/>
                </AppContext.Provider>
                
            </div> 

        </Router>
        
    );
}

export default App;