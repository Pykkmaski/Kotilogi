const { default: useProperties } = require("../Hooks/useProperties");
import { useContext, useRef, useState } from 'react';
import PropertyCard from '../Components/Cards/PropertyCard';
import AddProperty from '../Functions/AddProperty';
import Loading from './Loading';
import AppContext from '../../contexts/AppContext';
import {Link, useNavigate} from 'react-router-dom';
import { PropertiesGallery } from '../Components/Gallery/PropertiesGallery';

function Properties(props){
    const navigate = useNavigate();
    const {token, user} = useContext(AppContext);
    const [properties, loadProperties] = useProperties(user.email);

    if(!token) return navigate('/login');
    if(!properties) return <Loading message="Ladataan taloja..."/>

    return (
        <PropertiesGallery/>
    );
}

export default Properties;