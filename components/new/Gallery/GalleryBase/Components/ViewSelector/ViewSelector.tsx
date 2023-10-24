import { useState } from 'react';
import style from './style.module.scss';
import useGalleryContext from '../../GalleryContext';
import toast from 'react-hot-toast';

type ViewType = 'card' | 'list';

function CardButton(){
    return (
        <div className={style.cardButton}>
            <div className={style.square}/>
            <div className={style.square}/>
            <div className={style.square}/>
            <div className={style.square}/>
        </div>
    );
}

function ListButton(){
    return (
        <div className={style.listButton}>
            <div className={style.line}/>
            <div className={style.line}/>
            <div className={style.line}/>
        </div>
    );
}

export default function ViewSelector(){
    const {dispatch} = useGalleryContext();

    const onChangeHandler = (e) => {

        const viewType: string = e.target.value;

        dispatch({
            type: 'set_viewtype',
            value: viewType,
        });

        toast.success('Listan tyyli vaihdettu: ' + viewType);
    }

    return (
        <select onChange={onChangeHandler}>
            <option selected={true} disabled={true}>Listan Tyyli</option>
            <option value="card">Kortti</option>
            <option value={'list'}>Lista</option>
        </select>
    );
}
