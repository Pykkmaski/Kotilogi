'use server';

import style from './page.module.scss';
import { Header } from '@/components/Header/Header';
import { Group } from 'kotilogi-app/components/Group/Group';
import db from 'kotilogi-app/dbconfig';
import { Content } from './Content';

export default async function InfoPage({params}){
    const property = await db('properties').where({id: params.property_id}).first();
    if(!property) throw new Error('Talon lataaminen epäonnistui!');

    return (
       <main className={style.body}>
            <Header>
                <h3>Tiedot</h3>
            </Header>
            
            <Group direction="vertical" gap="1rem">
                <Content propertyData={property}/>
            </Group>
       </main> 
    );
}