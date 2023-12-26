"use client";

import { useEffect, useReducer} from "react";
import GalleryBaseReducer from "./GalleryBaseReducer";
import style from './style.module.scss';
import { serverGetDataById, serverGetDataOffset } from "kotilogi-app/actions/serverGetData";
import Body from "./Components/Body/Body";
import Header from "./Components/Header/Header";
import { GalleryContext } from "./GalleryContext";
import getDataOffset from "./Util/getDataOffset";
import { GalleryBase } from "./declerations";
import {useRouter, useSearchParams} from 'next/navigation';
import { getDataBySubstring } from "kotilogi-app/actions/getDataBySubstring";

export default function GalleryBase(props: GalleryBase.Props & {children?: React.ReactNode}){
    const searchParams = useSearchParams();
    const pageParam = searchParams.get('page');
    const currentPage: number = pageParam ? parseInt(pageParam) : 0;

    const initialState: GalleryBase.State = {
        data: [],
        selectedItems: [],
        showEditModal: false,
        isLoading: true,
        error: false,
        currentPage,
        searchString: '',
    }

    const [state, dispatch] = useReducer(GalleryBaseReducer, initialState);

    function fetchData(pageNumber: number){
        dispatch({
            type: 'toggle_loading',
            value: true,
        });

        serverGetDataOffset(props.tableName, props.query, getDataOffset(pageNumber, 10), 10)
        .then((data: any[]) => {
          if(!data){
            dispatch({
                type: 'toggle_error',
                value: true,
            });
          }
          else{
            //Sort the data by the time column, if one is present.
            data = data.sort((a, b) => {
                if('time' in a && 'time' in b){
                    const ams = new Date(a.time).getTime();
                    const bms = new Date(b.time).getTime();
                    
                    switch(props.tableName){
                        case 'usage': return ams - bms;

                        default: return bms - ams;
                    }
                }
                else{
                    return 0;
                }
            });

            dispatch({
                type: 'set_data',
                value: data,
            });
          }
        })
        .finally(() => {
            dispatch({
                type: 'toggle_loading',
                value: false,
            });
        })
    }

    useEffect(() => fetchData(currentPage), [currentPage, props.query]);

    useEffect(() => {
        if(state.searchString === '') return;

        dispatch({
            type: 'toggle_loading',
            value: true,
        });

        getDataBySubstring(props.tableName, state.searchString)
        .then(data => {
            dispatch({
                type: 'set_data',
                value: data,
            })
        })
        .catch(err => console.log(err.message))
        .finally(() => {
            dispatch({
                type: 'toggle_loading',
                value: false,
            });
        });
    }, [state.searchString]);    

    const contextValue: GalleryBase.ContextValue = {
        state,
        props,
        dispatch,
    }

    return (
        <GalleryContext.Provider value={contextValue}>
            <div className={style.galleryContainer}>
                {props.children}
            </div>
        </GalleryContext.Provider>
    )
}