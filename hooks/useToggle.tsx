'use client';

import { useState } from "react";

export function useToggle(initialState: boolean){
    const [toggled, setToggled] = useState(initialState);

    const toggleState = (state?: boolean) => {
        if(state !== undefined){
            setToggled(state);
        }
        else{
            setToggled(prev => !prev);
        }
    }

    return {toggled, toggleState};
}