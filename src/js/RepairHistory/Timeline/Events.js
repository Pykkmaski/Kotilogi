import '../Style.scss';
import AddEvent from './AddEvent';
import EventEntry from './EventEntry';

function Events({history}){

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
                    return <EventEntry item={item}/>
                })
            }
        </div>
    )
}

export default Events;