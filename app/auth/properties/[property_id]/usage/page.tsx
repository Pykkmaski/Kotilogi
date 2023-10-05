import styles from './page.module.scss';
import ChartSelector from './_Components/ChartSelector/ChartSelector';
import { serverGetData } from 'kotilogi-app/actions/serverGetData';
import PropertyProvider from 'kotilogi-app/contexts/PropertyProvider';

export default async function UsagePage({params}){
    const property = await serverGetData('properties', {id: params.property_id}, true) as Kotilogi.PropertyType;
    if(!property) throw new Error('Virhe ladattaessa taloa!');

    const usage = await serverGetData('usage', {refId: property.id}, false) as Kotilogi.UsageType[];
    if(!usage) throw new Error('Virhe ladattaessa kulutustietoja!');
    
    return (
        <ChartSelector usage={usage}/>
    )
}