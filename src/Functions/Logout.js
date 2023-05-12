import useLocalStorage from '../Hooks/useLocalStorage';
const {tokenStorageKey} = require('../appconfig');

function Logout(setToken){
    location.assign('/');
    setToken(null);
}

export default Logout;