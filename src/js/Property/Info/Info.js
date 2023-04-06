import './Style.scss';
import InfoPlackard from './InfoPlackard/InfoPlackard';

const imageIcon = './img/image.png';

function Info({property}){

    function convertInfoString(str, type, lang){
        if(type === 'heating'){
            switch(str){
                case 'central':{
                    if(lang === 'fi'){
                        return 'Kaukolämpö';
                    }
                }
                break;

                case 'oil':{
                    if(lang === 'fi'){
                        return 'Öljy';
                    }
                }
                break;

                case 'electric':{
                    if(lang === 'fi'){
                        return 'Sähkö';
                    }
                }
                break;

                default:{
                    if(lang === 'fi'){
                        return 'Ei määritelty'
                    }
                    else if(lang === 'en'){
                        return 'Not defined'
                    }
                }
            }
        }
        else{
            return str;
        }
    }

    function uploadImage(){
        const imageInput = document.querySelector('#image-input');
        const ev = new Event('input', {
            bubbles: true,
            cancelable: true
        });

        imageInput.dispatchEvent(ev);
    }
    
    return (
        <div id="info-page">
            <div className="info-image no-image" title={'Lisää kuva'}>
               <h2>Ei kuvaa</h2>
               <input type="file" accept="image/jpeg" id="image-input"/>
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