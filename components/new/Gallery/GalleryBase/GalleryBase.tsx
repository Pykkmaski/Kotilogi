"use client";

import { useEffect, useReducer} from "react";
import GalleryBaseReducer from "./GalleryBaseReducer";
import style from './gallery.module.scss';
import { serverGetDataById, serverGetDataOffset } from "kotilogi-app/actions/serverGetData";
import Body from "./Components/Body/Body";
import Header from "./Components/Header/Header";
import { GalleryContext } from "./GalleryContext";
import getDataOffset from "./Util/getDataOffset";
import { GalleryBase } from "./declerations";
import PageIndicator from "./Components/PageIndicator/PageIndicator";

export default function GalleryBase(props: GalleryBase.Props & {children?: React.ReactNode}){
    const initialState: GalleryBase.State = {
        data: [],
        selectedItems: [],
        showAddModal: false,
        showEditModal: false,
        showDeleteModal: false,
        isLoading: true,
        viewType: 'card',
        error: false,
        itemInFocus: null,
        currentPage: 0,
        searchString: '',
    }

    const [state, dispatch] = useReducer(GalleryBaseReducer, initialState);

    function reloadItem(id: Kotilogi.IdType){
        serverGetDataById(id, props.tableName)
        .then(data => {
            console.log('Got updated data')
            dispatch({
                type: 'update_item',
                value: data,
            });
        })
        .catch(err => {
            console.log(err.message);
        });
    }

    function loadData(){
        dispatch({
            type: 'toggle_loading',
            value: true,
        });

        serverGetDataOffset(props.tableName, props.query, getDataOffset(state.currentPage, 10), 10)
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
        loadData();
    }, [state.currentPage, props.query]);

    const contextValue: GalleryBase.ContextValue = {
        state,
        props,
        dispatch,
        reloadItem,
    }

    return (
        <GalleryContext.Provider value={contextValue}>
            <div className={style.galleryContainer}>
                
                {
                    props.AddModal ? <props.AddModal 
                        show={state.showAddModal} 
                        onHide={() => dispatch({
                            type: 'toggle_add_modal',
                            value: false,
                    })}
                    />
                    :
                    null
                }

                {
                    props.DeleteModal ? <props.DeleteModal
                        id={`gallery-delete-modal-${props.tableName}`}
                        show={state.showDeleteModal}
                        onHide={() => dispatch({
                            type: 'toggle_delete_modal',
                            value: false,
                        })}
                    />
                    :
                    null

                } 

                <Header
                    title={props.title}
                />

                <Body/>
                <PageIndicator/>
            </div>
        </GalleryContext.Provider>
    )
}