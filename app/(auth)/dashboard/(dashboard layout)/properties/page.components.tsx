'use client';

import { deleteProperty } from 'kotilogi-app/actions/property/deleteProperty';
import { ModalProps } from 'kotilogi-app/components/Modals/Modal';
import { AddPropertyModal } from 'kotilogi-app/components/Modals/AddModal';
import { PropertyListItem } from 'kotilogi-app/components/ListItem/ListItem';
import { Gallery } from 'kotilogi-app/components/new/Gallery/GalleryBase/Gallery';
import {Error} from 'kotilogi-app/components/new/Gallery/GalleryBase/Components/Error/Error';
import * as properties from '@/actions/properties';

export function Content({propertyData, user}: {
    propertyData: Kotilogi.PropertyType[],
    user: {email: string}
}){
    return (
        <main className='mb-4 flex-1 h-full'>
            <Gallery<Kotilogi.PropertyType> data={propertyData}>
                <Gallery.Header 
                    title="Talot" 
                    AddModal={(props) => <AddPropertyModal refId={user.email} {...props}/>}
                    DeleteModal={(props: ModalProps) => {
                        return <Gallery.DeleteModal<Kotilogi.PropertyType> {...props} deleteMethod={properties.del}/>
                    }}/>
                <Gallery.Body displayStyle='vertical' itemComponent={PropertyListItem} errorElement={
                    <Error title="Ei Taloja" message="Et ole vielä lisännyt taloja." icon="/icons/house.png"/>
                }/>
            </Gallery>
        </main>
    );
}