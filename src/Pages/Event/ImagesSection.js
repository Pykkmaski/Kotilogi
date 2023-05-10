import {useContext} from 'react';
import EventContext from '../../Contexts/EventContext';
import useEventImages from '../../Hooks/useEventImages';
import Gallery from '../../Components/Gallery';
import Section from '../../Components/Section';

function ImagesSection(props){

    const {event} = useContext(EventContext);
    const [images, loadImages] = useEventImages(event.id);

    return (
        <Section>
            <Section.Header>
                <h1>Kuvat</h1>
            </Section.Header>

            <Section.Body>
                <Gallery>
                    <Gallery.Body>
                        <Gallery.Button title="Lisää Kuva"/>
                        {
                            images.map(id => {
                                const imgSrc = `/api/events/${event_id}/images/${id}`;
                                return (
                                    <Gallery.Image src={imgSrc} loading="lazy" onError={(e) => e.target.src = './img/no-pictures.png'}/>
                                )
                            })
                        }
                    </Gallery.Body>
                </Gallery>
            </Section.Body>
        </Section>
    )
}

export default ImagesSection;