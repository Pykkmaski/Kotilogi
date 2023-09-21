"use client";

import { useEffect, useReducer} from "react";
import GalleryBaseReducer from "./GalleryBaseReducer";
import style from './gallery.module.scss';
import { serverGetData } from "kotilogi-app/actions/serverGetData";
import Body from "./Components/Body/Body";
import Header from "./Components/Header/Header";
import AddButton from "./Components/AddButton/AddButton";
import { GalleryContext } from "./GalleryContext";
import ViewSelector from "./Components/ViewSelector/ViewSelector";
import ActionSelector from "./Components/ActionSelector/ActionSelector";
import Entry from "./Components/ActionSelector/Components/Entry/Entry";

export default function GalleryBase(props: GalleryBase.Props){
    const initialState: GalleryBase.State = {
        data: [],
        selectedItemIds: [],
        showAddModal: false,
        isLoading: true,
    }

    const [state, dispatch] = useReducer(GalleryBaseReducer, initialState);

    const contextValue: GalleryBase.ContextValue = {
        state,
        contentType: props.contentType,
        dbTableName: props.dbTableName,
        refId: props.refId,
        dispatch,
    }

    const selectorEntries = [
        ...props.selectorEntries,
        <Entry text="Valitse Kaikki" onClick={() => dispatch({type: 'select_all', value: null})}/>,
    ];

    const buttons = [
        ...props.headerButtons,
        <AddButton addModalOptions={props.addModalOptions}/>
    ];

    useEffect(() => {
        serverGetData(props.dbTableName, {refId: props.refId}, false)
        .then(data => {
            if(!data){
                console.log('No data present!');
            }
            else{
                dispatch({
                    type: 'set_data',
                    value: data
                });
            }
        })
        .catch(err => {
            console.log(err.message);
        })
        .finally(() => {
            dispatch({
                type: 'toggle_loading',
                value: false,
            });
        });''
    }, []);

    return (
        <div className={style.container}>
            <GalleryContext.Provider value={contextValue}>
                <Header
                    title={props.title}
                    subTitle={props.subTitle}
                    buttons={buttons}
                />

                <Body error={props.error}/>
            </GalleryContext.Provider>
        </div>
    )
}