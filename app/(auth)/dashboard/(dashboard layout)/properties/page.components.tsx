'use client';

import { deleteProperty } from 'kotilogi-app/actions/property/deleteProperty';
import { ModalProps } from 'kotilogi-app/components/Modals/Modal';
import { AddPropertyModal } from 'kotilogi-app/components/Modals/AddModal';
import { PropertyListItem } from 'kotilogi-app/components/ListItem/ListItem';
import { Gallery } from 'kotilogi-app/components/new/Gallery/GalleryBase/Gallery';
import {Error} from 'kotilogi-app/components/new/Gallery/GalleryBase/Components/Error/Error';

export function Content({properties, user}){
    return (
        <main>
            <Gallery<Kotilogi.PropertyType> data={properties}>
                <Gallery.Header 
                    title="Talot" 
                    AddModal={(props) => <AddPropertyModal refId={user.email} {...props}/>}
                    DeleteModal={(props: ModalProps) => {
                        return <Gallery.DeleteModal {...props} deleteMethod={(id: string) => deleteProperty(id)}/>
                    }}/>
                <Gallery.Body displayStyle='vertical' itemComponent={PropertyListItem} errorElement={
                    <Error title="Ei Taloja" message="Et ole vielä lisännyt taloja." icon="/icons/house.png"/>
                }/>
            </Gallery>
        </main>
    );
}