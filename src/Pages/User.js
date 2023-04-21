import { useContext, useState, useEffect} from 'react';
import {Link, useParams} from 'react-router-dom';
import Unauthorized from './Unauthorized';
import AppContext from '../Contexts/AppContext';
import PropertyCard from '../Components/PropertyCard';
import Loading from './Loading';
import axios from 'axios';
import AppModal from '../Modals/AppModal';
import AddButton from '../Components/AddButton';

function User(props){

    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showUploadPropertyModal, setShowPropertyUploadModal] = useState(false);
    const {user} = useContext(AppContext);

    function loadProperties(){
        if(!user) return;
        setLoading(true);

        axios.get(`/property/all/`)
        .then(res => {
            setProperties(res.data);
        })
        .catch(err => {
            console.log(err.message);
        })
        .finally(() => {
            setLoading(false);
        })
    }

    function addProperty(e){
        e.preventDefault();
        axios.post(`/property/`, {
            heating_type: e.target.heating_type.value,
            floor_count: e.target.floor_count.value,
            wc_count: e.target.wc_count.value,
            room_count: e.target.room_count.value,
            build_year: e.target.build_year.value,
            area: e.target.area.value,
            yard_area: e.target.yard_area.value,
            address: e.target.address.value,
            
        }).then(res => {
            loadProperties();
        })
        .catch(err => {
            console.log(err.message);
        })
        .finally(() => setShowPropertyUploadModal(false));
    }

    useEffect(() => {
        loadProperties();
    }, [user]);

    if(!user) return <Unauthorized/>;
    if(loading) return <Loading message="Ladataan Taloja..."/>

    return (
        <div className="page" id="user-page">
            {
                !properties.length ? <>
                    <AddButton onClickHandler={() => setShowPropertyUploadModal(true)}>
                        <span>Lisää Uusi Talo</span>
                    </AddButton>
                </>

                : 

                <div id="property-grid" className={properties.length < 3 ? 'as-flexbox' : 'as-grid'}>
                    <AddButton onClickHandler={() => setShowPropertyUploadModal(true)}>
                        <span>Lisää Uusi Talo</span>
                    </AddButton>
                    {
                        properties.map(item => {
                            return(
                                <PropertyCard property={item}/>
                            )
                        })
                    }
                </div>
            }

            <AppModal 
                variant="upload/property" 
                showModal={showUploadPropertyModal} 
                setShowModal={setShowPropertyUploadModal}
                uploadFunction={addProperty}/>
        </div>
    );
}

export default User;