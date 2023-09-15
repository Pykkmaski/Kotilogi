import { serverGetDataById } from 'kotilogi-app/actions/serverGetData';
import styles from './page.module.scss';
import { throwErrorIfNull } from 'kotilogi-app/utils/throwErrorIfNull';
import Link from 'next/link';

export default async function InfoPage({params}){
    const property = await serverGetDataById(params.property_id, 'properties') as Kotilogi.PropertyType | null;
    throwErrorIfNull(property, 'Talon lataamienn epäonnistui!');

    const backgroundImage = `url(/api/files?dbTableName=property_images&id=${property?.main_image_id})`
    
    return (
        <div className={styles.container} style={{backgroundImage}}>
            <div className={styles.subContainer}>
                <div className={styles.titleContainer} style={undefined}>
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

                    <Link href="info/edit">Muokkaa</Link>
                </div>
            </div>
            
        </div>
    );
}