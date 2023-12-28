'use client';

import { CSSProperties } from "react";
import { useSearchField } from "./SearchField.hooks";


export function SearchField(){
    const {setWhat} = useSearchField();
    const inputStyle: CSSProperties = {
        borderRadius: '5px',
    }

    return (
        <input 
            style={inputStyle} 
            type="search" 
            placeholder="Etsi..." 
            onChange={(e) => setWhat(e.target.value)}/>
    );
}