'use client';

import { deleteProperty } from 'kotilogi-app/actions/property/deleteProperty';
import Modal, { ModalProps } from 'kotilogi-app/components/Modals/Modal';
import { AddPropertyModal } from 'kotilogi-app/components/Modals/AddModal';
import { PropertyListItem } from 'kotilogi-app/components/ListItem/ListItem';
import { Gallery } from 'kotilogi-app/components/new/Gallery/GalleryBase/Gallery';
import {Error} from 'kotilogi-app/components/new/Gallery/GalleryBase/Components/Error/Error';
import * as properties from '@/actions/properties';
import Button from '@/components/Button/Button';
import { Heading } from '@/components/Heading';
import { useState } from 'react';

function PaymentModal(props: ModalProps){
    return (
        <Modal {...props}>
            <Modal.Header>
                <Heading>Ostoskori</Heading>
            </Modal.Header>
            <div className="md:w-[700px] mt-16">
                <Modal.Body>
                    <div className="flex justify-between items-center">
                        <div className="flex gap-4 items-center">
                            <span className="text-lg">Kiinteistön avaus</span>
                            <input type="checkbox" disabled checked={true}/>
                        </div>
                        
                        <span className="text-2xl text-green-600">9.90€</span>
                    </div>
                </Modal.Body>
            </div>
            
            <Modal.Footer>
                <div className="flex flex-col justify-end">
                    <div className="flex gap-4">
                        <Button variant="secondary">Maksa myöhemmin</Button>
                        <Button variant="primary">
                            <span className="mx-8">Maksa</span>
                        </Button>
                    </div>

                    <span className="text-sm text-right text-slate-500 mt-2">Maksun suorittaa Paytrail.</span>
                </div>
                
            </Modal.Footer>
        </Modal>
    )
}

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