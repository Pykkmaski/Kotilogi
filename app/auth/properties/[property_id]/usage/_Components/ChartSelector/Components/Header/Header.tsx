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
import { useRouter, useSearchParams } from 'next/navigation';

export default function Header(){

    const {state, dispatch} = useChartSelectorContext();
    const router = useRouter();

    const searchParams = useSearchParams();
    const section = searchParams.get('section');
    const viewType = searchParams.get('viewType');

    const sectionOnChangeHandler = (e) => {
        router.replace(`?viewType=${viewType}&section=${e.target.value}`);
        dispatch({
            type: 'toggle_section',
            value: e.target.value,
        });
    }

    const viewTypeOnChangeHandler = (e) => {
        router.replace(`?viewType=${e.target.value}&section=${section}`);
        dispatch({
            type: 'set_view_type',
            value: e.target.value,
        });
    }

    return (
        <>
            <AddModal/>
            <DeleteModal/>
            <div className={style.headerContainer}>
                <div>
                    <select onChange={sectionOnChangeHandler}>
                        <option value="heat" selected={section === 'heat'}>Lämmitys</option>
                        <option value="water" selected={section === 'water'}>Vesi</option>
                        <option value="electric" selected={section === 'electric'}>Sähkö</option>
                    </select>

                    <select onChange={viewTypeOnChangeHandler}>
                        <option value="chart" selected={viewType === 'chart'}>Kaavio</option>
                        <option value="list" selected={viewType === 'list'}>Lista</option>
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