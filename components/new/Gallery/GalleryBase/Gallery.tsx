"use client";

import { createContext, useEffect, useReducer} from "react";
import GalleryBaseReducer, { ActionT } from "./Gallery.reducer";
import style from './style.module.scss';
import { serverGetDataById, serverGetDataOffset } from "kotilogi-app/actions/serverGetData";
import Body from "./Components/Body/Body";
import Header from "./Components/Header/Header";
import getDataOffset from "./Util/getDataOffset";
import {useSearchParams} from 'next/navigation';
import { getDataBySearch } from "kotilogi-app/actions/getDataBySearch";
import { ModalProps } from "kotilogi-app/components/Modals/Modal";

type GalleryProps = React.PropsWithChildren & {
    /**
     * The title displayed in the header of the gallery.
     */
    title: string,

    /**
     * The modal displayed when the global add-button of the gallery is pressed.
     */
    AddModal?: React.FC<{
        show: boolean,
        onHide: () => void
    }>,

    /**
     * The modal displayed when an object-cards open-button is pressed.
     */
    EditModal?: React.FC<{
        show: boolean,
        onHide: () => void
        item: any,
    }>,

    /**
     * The modal displayed when the global delete button of the gallery is pressed.
     */
    DeleteModal?: React.FC<ModalProps>,

    /**
     * Name of the database table containing the data to be displayed.
     */
    tableName: Kotilogi.Table,

    /**
     * Query object passed to knex.
     */
    query: {refId: Kotilogi.IdType, mimeType?: Kotilogi.MimeType, type?: 'heat' | 'water' | 'electric'},

    /**
     * For development purposes, Explicitly state this gallery is unsupported.
     */

    unsupported?: boolean,
}

export type GalleryStateType = {
    data: any[],
    selectedItems: any[],
    showEditModal: boolean,
    isLoading: boolean,
    currentPage: number,
    error: boolean,
    search: {
        what: string,
        column: string | null,
    },
}

type GalleryContextValueType = {
    state: GalleryStateType,
    props: GalleryProps,
    dispatch: React.Dispatch<ActionT>,
}

const GalleryContext = createContext<GalleryContextValueType | null>(null);

export function Gallery(props: GalleryProps){
    const searchParams = useSearchParams();
    const pageParam = searchParams.get('page');
    const currentPage: number = pageParam ? parseInt(pageParam) : 0;

    const initialState: GalleryStateType = {
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

    const contextValue: GalleryContextValueType = {
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