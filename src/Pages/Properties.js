const { default: Gallery } = require("../Components/Gallery");
const { default: useProperties } = require("../Hooks/useProperties");
import { useContext, useRef, useState } from 'react';
import PropertyCard from '../Components/Cards/PropertyCard';
import AddProperty from '../Functions/AddProperty';
import Loading from './Loading';
import AppContext from '../Contexts/AppContext';
import Unauthorized from './Unauthorized';
import Section from '../Components/Section';
import Button from '../Components/Buttons/Button';
import EditButton from '../Components/Buttons/EditButton';
import DeletePropertyModal from '../Components/Modals/DeletePropertyModal';
import DeleteProperty from '../Functions/DeleteProperty';
import ConfirmModal from '../Components/Modals/ConfirmModal';
import Delete from '../Functions/Delete';
import NoProperties from '../Components/Error/NoProperties';
import {Link, useNavigate} from 'react-router-dom';
import { PropertiesGallery } from '../Components/PropertiesGallery';

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