import './scss/main.scss';
import 'bootstrap/scss/bootstrap.scss';

import Header from './Components/Header';
import Home from './Pages/Home';
import Login from './Pages/Login';
import Signup from './Pages/Signup';
import Unknown from './Pages/Unknown.js';
import RegisterThankYou from './Pages/RegisterThankYou';
import AppContext from './Contexts/AppContext';
import Properties from './Pages/Properties';
import Event from './Pages/Event';
import {HashRouter as Router, Routes, Route} from 'react-router-dom';
import Property2 from './Pages/Property2';
import Pricing from './Pages/Pricing';
import Properties2 from './Pages/Properties2';
import { tokenStorageKey } from './appconfig';
import useLocalStorage from './Hooks/useLocalStorage';
import axios from 'axios';
import { useEffect } from 'react';
import useAxiosDefaultHeader from './Hooks/useAxiosDefaultHeader';

function App(props){
    const [token, setToken] = useLocalStorage(tokenStorageKey, null);
    axios.defaults.headers['Authorization'] = token;
    
    useEffect(() => {
        axios.defaults.headers['Authorization'] = token;
    }, [token]);

    return (
        <Router>
            <div className="bg-filler"/>
            <div className="app">

                <AppContext.Provider value={{token, setToken}}>
                <Header/>
                    <Routes>
                        <Route exact path="/" element={<Home/>}></Route>
                        <Route exact path="/login" element={<Login/>}></Route>
                        <Route exact path="/register" element={<Signup/>}></Route>
                        <Route exact path="/user/" element={<Properties2/>}></Route>
                        <Route exact path="/pricing" element={<Pricing/>}></Route>
                        <Route exact path="/property/:id/:section" element={<Property2/>}></Route>
                        <Route exact path="/events/:event_id" element={<Event/>}></Route>
                        <Route exact path="/thankyou" element={<RegisterThankYou/>}></Route>
                        <Route exact path="*" element={<Unknown/>}></Route>
                    </Routes>
                </AppContext.Provider>
            </div> 

        </Router>
        
    );
}

export default App;