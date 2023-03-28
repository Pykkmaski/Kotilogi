import Line from './Line.js';
import Node from './Node.js';

import '../../../scss/Timeline.scss';

function Timeline({length}){

    function generateTimeline(){
        const timeline = [];
        for(let i = 0; i < length; ++i){
            timeline.push(<Node/>);

            if(i !== (length - 1)){
                timeline.push(<Line/>);
            }
            
        }
        return timeline;
    }

    return (
        <div className="timeline">
            {
                generateTimeline()
            }
        </div>
    );
}

export default Timeline;