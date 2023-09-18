import styles from './page.module.scss';
import ChartSelector from './ChartSelector';
import { serverGetData } from 'kotilogi-app/actions/serverGetData';
import PropertyProvider from 'kotilogi-app/contexts/PropertyProvider';
import { throwErrorIfNull } from 'kotilogi-app/utils/throwErrorIfNull';

export default async function UsagePage({params}){
    const property = await serverGetData('properties', {id: params.property_id}, true) as Kotilogi.PropertyType;
    throwErrorIfNull(property, 'Virhe ladattaessa taloa!');

    const usage = await serverGetData('usage', {refId: property.id}, false) as Kotilogi.UsageType[];
    throwErrorIfNull(usage, 'Virhe ladattaessa kulutustietoja!');
    
    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <div className={styles.title}>
                    <h1>{property!.title}</h1>
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