"use client";

import { useEffect, useReducer} from "react";
import GalleryBaseReducer from "./GalleryBaseReducer";
import style from './gallery.module.scss';
import { serverGetDataOffset } from "kotilogi-app/actions/serverGetData";
import Body from "./Components/Body/Body";
import Header from "./Components/Header/Header";
import AddButton from "./Components/AddButton/AddButton";
import { GalleryContext } from "./GalleryContext";
import PageIndicator from "./Components/PageIndicator/PageIndicator";
import getDataOffset from "./Util/getDataOffset";
import { GalleryBase } from "./declerations";

export default function GalleryBase(props: GalleryBase.Props){
    const initialState: GalleryBase.State = {
        data: [],
        selectedItemIds: [],
        showAddModal: false,
        showEditModal: false,
        showDeleteModal: false,
        isLoading: true,
        viewType: 'card',
        error: false,
        itemInFocus: null,
        currentPage: 0,
    }

    const [state, dispatch] = useReducer(GalleryBaseReducer, initialState);

    const contextValue: GalleryBase.ContextValue = {
        state,
        props,
        dispatch,
    }

    useEffect(() => {
        dispatch({
            type: 'toggle_loading',
            value: true,
        });

        serverGetDataOffset(props.tableName, props.query, getDataOffset(state.currentPage, 4), 10)
        .then(data => {
          if(!data){
            dispatch({
                type: 'toggle_error',
                value: true,
            });
          }
          else{
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
    }, [state.currentPage]);

    return (
        <div className={style.galleryContainer}>
            <GalleryContext.Provider value={contextValue}>
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
            </GalleryContext.Provider>
        </div>
    )
}