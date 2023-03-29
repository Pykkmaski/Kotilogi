import { useEffect, useState } from 'react';
import '../../../scss/RepairHistory.scss';

function Node({content, setSelectedYear}){
    return (
        <div className="timeline-node" onClick={() => setSelectedYear(content)}>
            <div className="node-dot">

            </div>

            <div className="node-dot-info">
                <h2>{content}</h2>
            </div>
        </div>
    );
}

export default Node;