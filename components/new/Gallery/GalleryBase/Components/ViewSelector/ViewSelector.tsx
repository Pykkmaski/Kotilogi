import { useState } from 'react';
import style from './style.module.scss';

type ViewType = 'card' | 'list';

function CardButton(){
    return (
        <div className={style.button}>
            
        </div>
    );
}

function ListButton(){
    return (
        <div className={style.button}>
            
        </div>
    );
}
export default function ViewSelector(){
    const [selectedView, setSelectedView] = useState<ViewType>('card');
    
    return (
        <div className={style.container}>
            <CardButton/>
            <ListButton/>
        </div>
    )
}
