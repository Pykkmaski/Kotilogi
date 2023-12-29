'use client';
import style from '../layout.module.scss';

import { useState } from "react";
import EditDescriptionModal from "./EditDescriptionModal";
import BackgroundImage from './BackgroundImage';
import useData from 'kotilogi-app/hooks/useData';
import { usePropertyContext } from '../_util/PropertyContextProvider';

export default function PropertyDescriptionSection({propertyId}: {propertyId: Kotilogi.IdType}){
    const [showModal, setShowModal] = useState(false);
    const {property} = usePropertyContext();

    return (
        <>
            <EditDescriptionModal show={showModal} onHide={() => setShowModal(false)}/>
            <section className={style.headerSection}>
                <div className={style.backgroundImageGradient}/>
                <BackgroundImage mainImageId={property.mainImageId}/>
                <h1>{property.title}</h1>
                <p>
                    {property.description}
                </p>
                <span className={style.editLink} onClick={() => setShowModal(true)}>Muokkaa kuvausta</span>
                <a className={style.returnLink} href="/auth/properties/">Takaisin Taloihin</a>
            </section>
        </>
    );
}