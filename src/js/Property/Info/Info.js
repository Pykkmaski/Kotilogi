import './Style.scss';
import InfoPlackard from './InfoPlackard/InfoPlackard';
import { useParams } from 'react-router-dom';
import { useContext, useState, useEffect } from 'react';
import AppContext from '../../Contexts/AppContext';

const imageIcon = './img/image.png';

function Info({property}){

    const {id} = useParams();
    const {user} = useContext(AppContext);
    const [file, setFile] = useState(null);
    const [propertyMainImage, setPropertyMainImage] = useState(false);

    //Get property main image
    useEffect(() => {   
        
        const req = new XMLHttpRequest();
        req.open('GET', `/property/${id}/image/main`, true);
        req.setRequestHeader('Auth', user.token);
        req.send();

        req.onload = () => {
            if(req.status === 200){
                setPropertyMainImage(true);
            }
            else{
                console.log(req.status);
            }
        }
    }, []);

    function onChangeHandler(e){
        setFile(e.target.files[0]);
    }

    function onSubmitHandler(e){
        e.preventDefault();
        console.log(file);

        const data = new FormData();
        data.append('image', file);

        fetch(`/property/${id}/upload`, {
            headers: {
                Auth: user.token
            },

            method: 'POST',
            body: data
        })
        .then(res => {
            console.log(res);
        })
        .catch(err => {
            console.log(err.message);
        })
    }
    
    return (
        <div id="info-page" className="flex-row gap-l w-100 center-align">
            <div className={"info-image flex-column center-all rounded"} title={'Lisää kuva'}>
                {
                    propertyMainImage ? 
                    <img src={window.location.origin + `/property/${id}/image/main`}/> :
                    <form onSubmit={onSubmitHandler}>
                        <input type="file" name="image" onChange={onChangeHandler}/>
                        <button type="submit">Lähetä</button>
                    </form>
                }
            </div>

            <div className="info-area">
                <div className="info-row">
                    <InfoPlackard content={property.build_year} icon={'./img/hammer.png'} title={'Rakennusvuosi'} />
                    <InfoPlackard content={property.property_type} icon={'./img/house.png'} title={'Rakennustyyppi'}/>
                    <InfoPlackard content={property.heating_type} icon={'./img/air.png'} title={'Lämmitystyyppi'}/>
                </div>

                <div className="info-row">
                    <InfoPlackard content={property.color} icon={'./img/paintbrush.png'} title={'Väri'}/>
                    <InfoPlackard content={property.yard_ownership} icon={'./img/euro.png'} title={'Tontin omistus'}/>
                    <InfoPlackard content={<span>{property.yard_area}m<sup>2</sup></span>} icon={'./img/fence.png'} title={'Tontin neliömäärä'}/>
                    <InfoPlackard content={<span>{property.area}m<sup>2</sup></span>} icon={'./img/area.png'} title={'Talon neliömäärä'}/>
                </div>

                <div className="info-row">
                    <InfoPlackard content={property.floor_count} icon={'./img/stairs.png'} title={'Kerrosten lukumäärä'}/>
                    <InfoPlackard content={property.roof_type} icon={'./img/roof.png'} title={'Katon tyyppi'}/>
                    <InfoPlackard content={property.wc_count} icon={'./img/toilet.png'} title={'Vessojen lukumäärä'}/>
                    <InfoPlackard content={property.room_count} icon={'./img/door.png'} title={'Huoneiden lukumäärä'}/>
                </div>
                
            </div>
        </div>
    )
}

export default Info;