import { useContext, useState } from 'react';
import {Link} from 'react-router-dom';
import AppContext from '../Contexts/AppContext';
import Properties from './Properties';
import Index from './Index';

function Home(props){

    const [content, setContent] = useState([]);
    const {token} = useContext(AppContext);

    return( 
            token
            ?
            <Properties/>
            :
            <Index/>
    );
}

export default Home;