"use client";

import Button from 'kotilogi-app/components/Button/Button';
import { useChartSelectorContext } from '../../ChartSelectorContext';
import style from './style.module.scss';
import PlusIcon from 'kotilogi-app/assets/plus.png';
import BinIcon from 'kotilogi-app/assets/bin.png';
import AddModal from './Components/AddButton/Components/AddModal/AddModal';
import DeleteModal from './Components/DeleteButton/Components/DeleteModal/DeleteModal';
import AddButton from './Components/AddButton/AddButton';
import DeleteButton from './Components/DeleteButton/DeleteButton';

export default function Header(){

    const {state, dispatch} = useChartSelectorContext();

    return (
        <>
            <AddModal/>
            <DeleteModal/>
            <div className={style.headerContainer}>
                <div>
                    <select onChange={(e) => dispatch({
                        type: 'toggle_section',
                        value: e.target.value,
                    })}>
                        <option value="heat">Lämmitys</option>
                        <option value="water">Vesi</option>
                        <option value="electric">Sähkö</option>
                    </select>

                    <select onChange={(e) => dispatch({
                        type: 'set_view_type',
                        value: e.target.value,
                    })}>
                        <option value="chart">Kaavio</option>
                        <option value="list">Lista</option>
                    </select>
                </div>
                
                <div>
                    <DeleteButton/>
                    <AddButton/>
                </div>      
            </div>
        </>
        
    )
}