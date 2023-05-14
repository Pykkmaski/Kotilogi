import useLocalStorage from '../Hooks/useLocalStorage';
const {tokenStorageKey} = require('../appconfig');

function Logout(setToken){
    setToken(null);
    location.assign('/');
}

export default Logout;