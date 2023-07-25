import { useContext, useState } from 'react';
import {Link} from 'react-router-dom';
import AppContext from '../Contexts/AppContext';
import Properties from './Properties';
import Index from './Index';
import ActivateUser from './ActivateUser/ActivateUser';

function Home(props){

    const [content, setContent] = useState([]);
    const {token, userActiveStatus} = useContext(AppContext);

    console.log('userActiveStatus: ' + userActiveStatus);
    return( 
            token && userActiveStatus === false
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