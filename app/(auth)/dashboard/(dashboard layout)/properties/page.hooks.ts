'use client';

import { useEffect, useReducer } from "react";
import { reducer } from "./page.reducer";
import { getData } from "kotilogi-app/actions/data/getData";

type StateType = {
    properties: {id: string}[] | null,
    selectedProperties: {id: string}[],
}

const initialValue: StateType = {
    properties: [],
    selectedProperties: [],
}

export function usePropertiesPage(session){
    const [state, dispatch] = useReducer(reducer, initialValue);

    useEffect(() => {
        if(session.data && session.data.user){
            getData('properties', {refId: session.data.user.email})
            .then(res => dispatch({
                type: 'set_properties',
                value: res,
            }));
        }
    }, [session.status]);

    useEffect(() => {
        console.log(state.selectedProperties.map(prop => prop.id))
    }, [state.selectedProperties]);

    return [state, dispatch] as const;
}