import '../../../scss/RepairHistory.scss';
import EventEntry from './EventEntry';

function Events({history, selectedYear}){

    return (
        <div id="timeline-events">
            {
                history.filter(item => item.created_at.split(' ')[0].split('-')[0] === selectedYear).map(item => {
                    const component = (
                       <EventEntry item={item}/>
                    )
                    return component;
                })
            }
        </div>
    )
}

export default Events;