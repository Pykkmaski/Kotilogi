import Header from '../Header/Header';
import Home from '../Home/Home';
import Login from '../Login/Login';
import Signup from '../Signup/Signup';
import Unknown from '../Unknown/Unknown.js';
import RegisterThankYou from '../RegisterThankYou/RegisterThankYou';
import AppContext from '../Contexts/AppContext';
import User from '../User/User';
import {HashRouter as Router, Routes, Route} from 'react-router-dom';
import './Style.scss';
import { useState, useEffect } from 'react';
import Add from '../Property/Add/Add.js';
import Manage from '../Property/Manage/Manage';
import RepairHistory from '../RepairHistory/RepairHistory';
import Energy from '../Energy/Energy';
import Houses from '../Houses/Houses';
import AddEvent from '../Property/AddEvent/AddEvent';
import EditEvent from '../Property/EditEvent/EditEvent';
import {serviceName} from '../appconfig';

const {userStorageName} = require('../appconfig');

function App(props){

    const [user, setUser] = useState(() => {
        const user = localStorage.getItem(userStorageName);
        if(user) return JSON.parse(user);
        return null;
    });

    return (
        <Router>
            <div className="app">

                <AppContext.Provider value={{user, setUser}}>
                <Header/>

                    <Routes>
                        <Route exact path="/" element={<Home/>}></Route>
                        <Route exact path="/login" element={<Login/>}></Route>
                        <Route exact path="/register" element={<Signup/>}></Route>
                        <Route exact path="/user/" element={<User/>}></Route>
                        <Route exact path="/houses/:id" element={<Houses/>}></Route>
                        <Route exact path="/property/:id/:section" element={<Manage/>}></Route>
                        <Route exact path="/property/:id/repairHistory/" element={<RepairHistory/>}></Route>
                        <Route exact path="/property/:id/energy/" element={<Energy/>}></Route>
                        <Route exact path="/property/add" element={<Add/>}></Route>
                        <Route exact path="/property/:id/events/add" element={<AddEvent/>}></Route>
                        <Route exact path="/property/:property_id/events/:event_id/edit" element={<EditEvent/>}></Route>
                        <Route exact path="/thankyou" element={<RegisterThankYou/>}></Route>
                        <Route exact path="*" element={<Unknown/>}></Route>
                    </Routes>
                </AppContext.Provider>
                
                <footer>&copy;{serviceName}</footer>
            </div> 

        </Router>
        
    );
}

export default App;