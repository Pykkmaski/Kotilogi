import styles from './page.module.scss';
import { PropertyType } from 'kotilogi-app/types/PropertyType';
import ChartSelector from './ChartSelector';
import { serverGetData } from 'kotilogi-app/actions/serverGetData';
import PropertyProvider from 'kotilogi-app/contexts/PropertyProvider';
import { throwErrorIfNull } from 'kotilogi-app/utils/throwErrorIfNull';
import { UsageType } from 'kotilogi-app/types/UsageType';

export default async function UsagePage({params}){
    const property = await serverGetData('properties', {id: params.property_id}, true) as PropertyType;
    throwErrorIfNull(property, 'Virhe ladattaessa taloa!');

    const usage = await serverGetData('usage', {property_id: property.id}, false) as UsageType[];
    throwErrorIfNull(usage, 'Virhe ladattaessa kulutustietoja!');
    
    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <div className={styles.title}>
                    <h1>{property!.address}</h1>
                    <small>Kulutustiedot</small>
                </div>
            </div>

            <main>
                <PropertyProvider property={property}>
                    <ChartSelector usage={usage}/>
                </PropertyProvider>
            </main>
        </div>  
    )
}