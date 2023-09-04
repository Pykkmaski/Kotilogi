"use client";

export default function useSessionStorage(key: string){
    const value: string | null = sessionStorage.getItem(key);

    function setValue(value: any){
        sessionStorage.setItem(key, value);
    }

    function deleteValue(){
        sessionStorage.removeItem(key);
    }

    return {value, setValue, deleteValue};
}