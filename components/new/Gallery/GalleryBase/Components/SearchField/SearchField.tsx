'use client';

import { CSSProperties, useEffect, useRef, useState } from "react";
import useGalleryContext from "../../GalleryContext";

export function SearchField(){

    const {dispatch, state} = useGalleryContext();
    const [search, setSearch] = useState('');
    const timeout = useRef<NodeJS.Timeout | null>(null);
    
    const onInputHandler = (e) => {
        setSearch(e.target.value);
    }

    useEffect(() => {
        const duration = 500;

        timeout.current = setTimeout(() => {
            dispatch({
                type: 'set_search',
                value: search,
            })
    
        }, duration);

        return () => {
            if(!timeout.current) return;
            clearTimeout(timeout.current);
        }
    }, [search])

    const inputStyle: CSSProperties = {
        borderRadius: '5px',
    }

    return (
        <input 
            style={inputStyle} 
            type="search" 
            placeholder="Etsi..." 
            onChange={onInputHandler} 
            disabled={state.data.length === 0}/>
    );
}