const { default: axios } = require("axios");
const { useState } = require("react");

import useLocalStorage from './useLocalStorage';
const {userStorageKey} = require('../appconfig');

function useUser(){
    const [user, setUser] = useLocalStorage(userStorageKey, null);
    
    function loadUser(config){

        if(!config) throw new Error('useUser, loadUser: must pass a config object argument!');
        if(config.email && config.user) throw new Error('useUser, loadUser: config.email and config.user cannot both be defined!');

        if(config.email){
            axios.get('/api/users/', {
                email
            })
            .then(res => {
                const loadedUser = res.data;
                setUser(loadedUser);
            })
            .catch(err => console.log(err.response));
        }
        else{
            if(!config.user.email || config.user.active === undefined) throw new Error('useUser, loadUser: config.user must have a valid email and active field!');
            setUser(config.user);
        }
       
    }

    return [user, loadUser];
}

export default useUser;