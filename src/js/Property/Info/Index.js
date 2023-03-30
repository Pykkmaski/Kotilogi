import '../../../scss/Info';

function Info({property}){

    return (
        <div id="info-page">
            <table>
                <tbody>
                    <tr>
                        <td>Lämmitystyyppi</td>
                        <td>{property.heating_type || 'Ei määritelty'}</td>
                    </tr>

                    <tr>
                        <td>Rakennusvuosi</td>
                        <td>{property.build_year}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default Info;