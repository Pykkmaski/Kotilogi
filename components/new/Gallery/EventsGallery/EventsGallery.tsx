'use client';

import GalleryBase from '@/components/new/Gallery/GalleryBase/GalleryBase';
import AddModal from './components/AddModal/AddModal';
import Card from '../GalleryBase/Components/Body/Components/Card/Card';
import EventsMenu from './components/OverlayMenu/EventsMenu';
import ItemDeleteModal from '../Modals/ItemDeleteModal';
import GlobalDeleteModal from '../Modals/GlobalDeleteModal/GlobalDeleteModal';
import Error from '../GalleryBase/Components/Error/Error';
import HistoryIcon from '@/assets/history.png';
import style from './style.module.scss';

function ItemComponent(props: {
    item: any
}){
    return <Card 
        item={props.item}
        OverlayMenu={EventsMenu}
        DeleteModal={ItemDeleteModal}
        titleContent={
        <>
            <span className={style.date}>{props.item.time !== null ? new Date(props.item.time).toLocaleDateString('fi-FI') : 'Ei Päivämäärää'}</span> 
            <br/>
        </>
        }
    />
}

type EventsGalleryProps = {
    propertyId: string
    propertyAddress: string,
}

export default function EventsGallery(props: EventsGalleryProps){
    return (
       <GalleryBase
            title="Tapahtumat"
            tableName="propertyEvents"
            contentType="object"
            query={{
                refId: props.propertyId
            }}
            AddModal={AddModal}
            DeleteModal={GlobalDeleteModal}
            key={'event-gallery'}
            ItemComponent={ItemComponent}
            errorComponent={
                <Error
                    title="Ei Tapahtumia"
                    message="Et ole vielä lisännyt tapahtumia. Aloita painamalla yläreunassa olevaa Lisää Uusi-painiketta."
                    icon={HistoryIcon}
                />
            }   
       />
    )
}