import { serverGetDataById } from 'kotilogi-app/actions/serverGetData';
import styles from './page.module.scss';
import { PropertyType } from 'kotilogi-app/types/PropertyType';
import { throwErrorIfNull } from 'kotilogi-app/utils/throwErrorIfNull';
import Background from './placeholder.jpg';

export default async function InfoPage({params}){
    const property = await serverGetDataById(params.property_id, 'properties') as PropertyType | null;
    throwErrorIfNull(property, 'Talon lataamienn epäonnistui!');

    const titleContainerStyleConfig = {
        backgroundImage: `url(${Background})`,
    }

    return (
        <div className={styles.container}>
            <div className={styles.subContainer}>
                <div className={styles.titleContainer} style={titleContainerStyleConfig}>
                    <h1>{property?.address}</h1>
                    <small>{property?.owner}</small>
                    <p>
                        {property!.description}
                    </p>
                </div>

                <div className={styles.infoContainer}>
                    <span>
                        Talotyyppi: 
                        <span className={styles.value}> {property!.property_type}</span>
                    </span>

                    <span>
                        Rakennusvuosi: 
                        <span className={styles.value}> {property!.build_year}</span>
                    </span>

                    <span>
                        Energialuokka: 
                        <span className={styles.value}> {property!.energy_class}</span>
                    </span>

                    <span>
                        Rakennusmateriaali: 
                        <span className={styles.value}> {property!.building_material}</span>
                    </span>
                </div>
            </div>
            
        </div>
    );
}