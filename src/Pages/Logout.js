import AppContext from '../Contexts/AppContext';
import Loading from './Loading';
import LogoutFunction from '../Functions/Logout';
import {useContext, useEffect} from 'react';

function Logout(props){

    const {setToken} = useContext(AppContext);

    useEffect(() => {
        LogoutFunction(setToken);
    }, []);

    return(
        <Loading message="Kirjaudutaan Ulos..."/>
    )
}

export default Logout;