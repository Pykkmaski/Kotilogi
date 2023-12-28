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
import { getDataBySearch } from "kotilogi-app/actions/getDataBySearch";

export function Gallery(props: GalleryBase.Props & {children?: React.ReactNode}){
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
        search: {
            what: '',
            column: null,
        },
    }

    const [state, dispatch] = useReducer(GalleryBaseReducer, initialState);

    function fetchData(pageNumber: number){
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

    useEffect(() => {
        dispatch({
            type: 'toggle_loading',
            value: true,
        });

        if(state.search.what === ''){
            //Fetch everything when the string is empty.
            fetchData(0);
        }
        else{
            getDataBySearch(props.tableName, state.search)
            .then(data => {
                dispatch({
                    type: 'set_data',
                    value: data,
                })
            })
            .catch(err => console.log(err.message));
        }

        dispatch({
            type: 'toggle_loading',
            value: false,
        });
        
    }, [state.search.what]);    

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