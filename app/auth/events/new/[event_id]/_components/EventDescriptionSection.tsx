'use client';
import style from '../layout.module.scss';

import { useState } from "react";
import EditDescriptionModal from "./EditDescriptionModal";
import BackgroundImage from './BackgroundImage';
import useData from 'kotilogi-app/hooks/useData';
import { useEventContext } from '../_util/EventContextProvider';
import Link from 'next/link';

export default function EventDescriptionSection({eventId}: {eventId: Kotilogi.IdType}){
    const [showModal, setShowModal] = useState(false);
    const {event} = useEventContext();

    return (
        <>
            <EditDescriptionModal show={showModal} onHide={() => setShowModal(false)}/>
            <section className={style.headerSection}>
                <div className={style.backgroundImageGradient}/>
                <BackgroundImage mainImageId={event.mainImageId}/>
                <h1>{event.title}</h1>
                <p>
                    {event.description}
                </p>
                <span className={style.editLink} onClick={() => setShowModal(true)}>Muokkaa kuvausta</span>
                <Link className={style.returnLink} href={`/auth/properties/new/${event.refId}/events`}>Takaisin Taloon</Link>
            </section>
        </>
    );
}