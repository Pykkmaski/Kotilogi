import { serverGetDataById } from 'kotilogi-app/actions/serverGetData';
import styles from './page.module.scss';
import { throwErrorIfNull } from 'kotilogi-app/utils/throwErrorIfNull';
import Link from 'next/link';
import lang from 'kotilogi-app/kotilogi.lang';
import Modal from 'kotilogi-app/components/Modals/Modal';
import Form from 'kotilogi-app/components/Form';
import InfoEntry from './_Components/DBColumn/DbColumn';
import DbColumn from './_Components/DBColumn/DbColumn';

type EntryProps = {
    label: string,
    value: any,
}

export default async function InfoPage({params}){
    const property = await serverGetDataById(params.property_id, 'properties') as Kotilogi.PropertyType | null;
    if(!property) throw new Error('Talon lataaminen epäonnistui!');

    const content = Object.entries(property).map((entry, index: number) => {
        if(!lang.properties[entry[0]]) return null;

        const label: string = lang.properties[entry[0]]['fi'];
        const value = entry[1];
        
        const isNumber = label.includes('Count');
        const isTextArea = label === 'description';
        const isSelect = label.includes('Type');
        const inputType = isNumber ? 'number' : isTextArea ? 'textarea' : 'text';

        const row = (
            <Link href={`edit?to=${entry[0]}`}>
                <DbColumn 
                    defaultValue={value as string} 
                    id={`dbcolumn-info-${index}`} 
                    label={label} 
                    value={value as string} 
                    hidden={!value} 
                    type={inputType}
                />
            </Link>
            
        );

        return row;
    });
    
    return (
        <div className={styles.container}>
            <Link href="edit" className={styles.editLink}>Muokkaa</Link>
            <div className={styles.subContainer}>
                <div className={styles.titleContainer} style={undefined}>
                    <small>{property?.refId}</small>
                    <p>
                        {property!.description}
                    </p>
                </div>

                <div className={styles.infoContainer}>
                    {content}
                </div>
            </div>
            
        </div>
    );
}