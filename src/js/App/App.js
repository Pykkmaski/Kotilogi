import Header from '../Header/Header';
import Home from '../Home/Home';
import Login from '../Login/Login';
import Signup from '../Signup/Signup';
import Unknown from '../Unknown/Unknown.js';
import RegisterThankYou from '../RegisterThankYou/RegisterThankYou';
import AppContext from '../Contexts/AppContext';
import User from '../User/User';
import {HashRouter as Router, Routes, Route} from 'react-router-dom';
import '../../scss/App.scss';
import { useState, useEffect } from 'react';
import AddProperty from '../AddProperty/AddProperty';

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
                        <Route exact path="/user" element={<User/>}></Route>
                        <Route exact path="/addProperty" element={<AddProperty/>}></Route>
                        <Route exact path="/thankyou" element={<RegisterThankYou/>}></Route>
                        <Route exact path="*" element={<Unknown/>}></Route>
                    </Routes>
                </AppContext.Provider>
                
                <footer>&copy;Digikoti Oy</footer>
            </div> 

        </Router>
        
    );
}

export default App;