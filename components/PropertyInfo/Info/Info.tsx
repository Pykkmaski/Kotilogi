/**
 * Takes property data and allows it to be organized and displayed.
 */

import { useState } from 'react';
import style from './style.module.scss';

type ViewType = 'overview' | 'house' | 'yard';

function OverviewList(){
    return (
        <InfoList>
            
        </InfoList>
    )
}
export default function Info(){
    const [selectedView, setSelectedView] = useState<ViewType>('overview');

    return (
        <div className={style.infoContainer}>
            {
                selectedView === 'overview' ? 
            }
        </div>
    );
}