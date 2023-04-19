import '../Style.scss';
import AddEvent from './AddEvent';
import EventEntry from './EventEntry';
import {useRef} from 'react';

function Events({history}){

    const altColor = useRef(false);

    history.sort((a, b) => {
        const dateATime = new Date(a.date).getTime();
        const dateBTime = new Date(b.date).getTime();
        return  dateBTime - dateATime;
    });

    return (
        <div id="timeline-events" className="flex-column w-100 gap-m scroll-y">
            <AddEvent/>
            {
                history.map(item => {
                    const component = <EventEntry item={item} altColor={altColor.current}/>
                    altColor.current = !altColor.current;
                    return component;
                })
            }
        </div>
    )
}

export default Events;