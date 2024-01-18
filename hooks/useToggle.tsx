'use client';

import { useState } from "react";

export function useToggle(initialState: boolean){
    const [toggled, setToggled] = useState(initialState);

    const toggleState = () => setToggled(prev => !prev);

    return {toggled, toggleState};
}