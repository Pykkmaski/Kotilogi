import { useContext, useState } from 'react';
import {Link} from 'react-router-dom';
import AppContext from '../Contexts/AppContext';
import Properties from './Properties';
import Index from './Index/Index';
import ActivateUser from './ActivateUser/ActivateUser';

function Home(props){

    const [content, setContent] = useState([]);
    const {token, user} = useContext(AppContext);

    return( 
            token && user.active == false 
            ?
            <ActivateUser/>
            :
            token
            ?
            <Properties/>
            :
            <Index/>
    );
}

export default Home;