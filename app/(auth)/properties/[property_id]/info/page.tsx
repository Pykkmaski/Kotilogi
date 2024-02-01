'use server';

import { Header } from '@/components/Header/Header';
import { Group } from 'kotilogi-app/components/Group/Group';
import db from 'kotilogi-app/dbconfig';
import { Content } from './Content';

export default async function InfoPage({params}){
    const property = await db('properties').where({id: params.property_id}).first();
    if(!property) throw new Error('Talon lataaminen epäonnistui!');

    return (
       <main className="flex-col flex gap-4 mb-4 w-full">
            <Header>
                <h3>Tiedot</h3>
            </Header>
            
            <div className="w-full">
                <Group direction="col" gap={4}>
                    <Content propertyData={property}/>
                </Group>
            </div>
       </main> 
    );
}