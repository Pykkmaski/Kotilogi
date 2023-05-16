import {useState, useEffect, useContext} from 'react';
import EventContext from '../../Contexts/EventContext';
import Section from '../../Components/Section';
import UpdateEvent from '../../Functions/UpdateEvent';
import Image from '../../Components/Image';
import AppModal from '../../Modals/AppModal';

function InfoSection(props){
    const [editing, setEditing] = useState(false);
    const {event, loadEvent} = useContext(EventContext);
    const [showEditEventModal, setShowEditEventModal] = useState(false);

    const eventMainImage = `/api/images/events/${event.id}/main`;
    console.log(event.date);
    useEffect(() => {
        if(editing === true){
            setShowEditEventModal(true);
        }
        else{
            setShowEditEventModal(false);
        }
    }, [editing])
    
    return (
        <Section>
            <Section.Header>
                <h1>Tapahtuman Tiedot</h1>
                <div className="group-row">
                    <button className="primary" onClick={() => setEditing(true)}>Muokkaa Tapahtumaa</button> 
                </div>

                <AppModal
                    variant="update/event"
                    showModal={showEditEventModal}
                    setShowModal={setShowEditEventModal}
                    event={event}
                    cancelFunction={() => {
                        setEditing(false);
                    }}

                    uploadFunction={(e) => {
                        e.preventDefault();
                        console.log('ryyps');
                        const data = {
                            name: e.target.name.value,
                            description: e.target.description.value,
                        }

                        UpdateEvent(event.id, data, () => {
                            setEditing(false);
                            loadEvent();
                        });
                    }}
                />
            </Section.Header>

            <Section.Body>
                <Image src={eventMainImage} onError={(e) => e.target.src = './img/no-pictures.png'} loading='lazy'>
                    <Image.Controls>
                        <button className="primary">Korvaa</button>
                    </Image.Controls>
                </Image>
                <h2>{event.name}</h2>
                <p>
                    {event.description}
                    <br/>
                    ryyppägs
                </p>
            </Section.Body>

           
        </Section>
    )
}

export default InfoSection;