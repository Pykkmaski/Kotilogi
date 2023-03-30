import '../../../scss/Info.scss';

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
            <table>
                <tbody>
                    <tr>
                        <td>Omistaja</td>
                        <td className="info-cell">{property.owner}</td>
                    </tr>
                    <tr>
                        <td>Lämmitystyyppi</td>
                        <td className="info-cell">{convertInfoString(property.heating_type, 'heating', 'fi')}</td>
                    </tr>

                    <tr>
                        <td>Rakennusvuosi</td>
                        <td className="info-cell">{property.build_year}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default Info;