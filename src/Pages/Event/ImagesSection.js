import {useContext, useState, useRef} from 'react';
import EventContext from '../../Contexts/EventContext';
import useEventImages from '../../Hooks/useEventImages';
import ImageSection from '../../Components/ImagesSection';

function ImagesSection(props){

    const {event, loadEvent, loadMainImageId} = useContext(EventContext);
    const [images, loadImages] = useEventImages(event.id);

    return (
        <ImageSection
            target={event}
            loadTarget={loadMainImageId}
            images={images}
            loadImages={loadImages}
            baseUrl={'/api/images/events'}
            uploadRoute={`/api/images/events/${event.id}`}
            deleteRoute={`/api/images/events/${event.id}/image`}
            updateRoute={`/api/images/events/${event.id}/image`}
            mainImageUpdateRoute={`/api/images/events/${event.id}/main`}
        />
    )
}

export default ImagesSection;