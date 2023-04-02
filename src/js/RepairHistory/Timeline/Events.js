import '../../../scss/RepairHistory.scss';
import EventEntry from './EventEntry';

function Events({history, selectedYear}){

    const selectedYearsHistory = history.filter(item => item.date.split('-')[0] === selectedYear);
    selectedYearsHistory.sort((a, b) => {
        const dateATime = new Date(a.date).getTime();
        const dateBTime = new Date(b.date).getTime();
        return  dateBTime - dateATime;
    });

    return (
        <div id="timeline-events">
            {
                selectedYearsHistory.map(item => {
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