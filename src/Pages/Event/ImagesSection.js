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
        />
    )
}

export default ImagesSection;