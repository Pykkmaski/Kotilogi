"use client";

import { useEffect, useState } from "react";

function getSavedValue(key: string, initialValue: any){
    const savedValue: string | null = JSON.parse(localStorage.getItem(key) as string);
    if(savedValue) return savedValue;

    if(initialValue instanceof Function) return initialValue();
    return initialValue;
}

function useLocalStorage(key: string, initialValue: any){
    const [value, setValue] = useState(() => {
        return getSavedValue(key, initialValue);
    });

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value));
    }, [value]);

    return [value, setValue];

}

export default useLocalStorage;