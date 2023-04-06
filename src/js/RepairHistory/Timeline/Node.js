import { useEffect, useState, useContext } from 'react';
import './Style.scss';
import TimelineContext from '../../Contexts/TimelineContext';

function Node({content}){

    const {selectedYear, setSelectedYear} = useContext(TimelineContext);

    return (
        <div className="timeline-node" onClick={() => setSelectedYear(content)}>

            <div className={content === selectedYear ? 'node-selection-bg selected' : 'node-selection-bg'}></div>

            <div className="node-dot">

            </div>

            <div className={content === selectedYear ? 'node-dot-info selected' : 'node-dot-info'}>
                <h2>{content}</h2>
            </div>
        </div>
    );
}

export default Node;