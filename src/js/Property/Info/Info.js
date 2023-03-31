import '../../../scss/Info.scss';
import InfoPlackard from './InfoPlackard';

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
    }
    return (
        <div id="info-page">
            <div className="info-image">
                <img src="./img/index.jpg" height="200px" width="200px"/>
            </div>

            <div className="info-area">
                <div className="info-row">
                    <InfoPlackard content={property.build_year} icon={'./img/hammer.png'} />
                    <InfoPlackard content={property.property_type} icon={'./img/house.png'}/>
                    <InfoPlackard content={convertInfoString(property.heating_type, 'heating', 'fi')} icon={'./img/air.png'}/>
                </div>

                <div className="info-row">
                    <InfoPlackard content={property.color} icon={'./img/paintbrush.png'}/>
                    <InfoPlackard content={property.yard_ownership} icon={'./img/euro.png'}/>
                    <InfoPlackard content={property.yard_area} icon={'./img/fence.png'}/>
                    <InfoPlackard content={property.area} icon={'./img/area.png'}/>
                </div>

                <div className="info-row">
                    <InfoPlackard content={property.floor_count} icon={'./img/stairs.png'}/>
                    <InfoPlackard content={property.roof_type} icon={'./img/roof.png'}/>
                    <InfoPlackard content={property.wc_count} icon={'./img/toilet.png'}/>
                    <InfoPlackard content={property.room_count} icon={'./img/door.png'}/>
                </div>
                
            </div>
        </div>
    )
}

export default Info;