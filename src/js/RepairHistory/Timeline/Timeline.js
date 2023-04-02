import Line from './Line.js';
import Node from './Node.js';

import '../../../scss/Timeline.scss';
import LoadingSpinner from '../../LoadingSpinner/LoadingSpinner.js';

function Timeline({history, setSelectedYear, loading}){

    function generateTimeline(){
        const timeline = [];
       
        for(let i = 0, previousYear = 0; i < history.length; ++i){
            const entry = history[i];
            const year = entry.date.split('-')[0];

            if(year === previousYear) continue;

            timeline.push(<Node content={year} setSelectedYear={setSelectedYear}/>);
            previousYear = year;

            if(i !== (history.length - 1)){
                timeline.push(<Line/>);
            }
            
        }
        return timeline;
    }

    return (
        <div className="timeline">
            {
                loading ? <LoadingSpinner width="2rem" height="2rem"/> :
                history && history.length ? generateTimeline() : <h2>Tälle talolle ei ole vielä lisätty tietoja.</h2>
            }
        </div>
    );
}

export default Timeline;