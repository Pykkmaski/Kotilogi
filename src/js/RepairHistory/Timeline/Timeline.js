import Line from './Line.js';
import Node from './Node.js';

import '../../../scss/Timeline.scss';

function Timeline({history, setSelectedYear}){

    function generateTimeline(){
        const timeline = [];
       

        for(let i = 0, previousYear = 0; i < history.length; ++i){
            const year = history[i].created_at.split(' ')[0].split('-')[0];
            const content = history[i].name;

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
                history && history.length ? generateTimeline() : <h2>Tälle talolle ei ole vielä lisätty tietoja.</h2>
            }
        </div>
    );
}

export default Timeline;