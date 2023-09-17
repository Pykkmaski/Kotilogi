"use client";

import { useEffect, useReducer, useRef, useState } from "react";
import useGalleryContext, { GalleryContext } from "./GalleryContext";
import Modal from "kotilogi-app/components/Modals/Modal";
import GalleryBaseReducer from "./GalleryBaseReducer";
import style from './gallery.module.scss';
import getCard from "./Util/getCard";
import { serverGetData, serverGetDataById } from "kotilogi-app/actions/serverGetData";
import Spinner from "kotilogi-app/components/Spinner/Spinner";
import Loading from "kotilogi-app/components/Loading/Loading";
import BaseAddModalBody from "./Components/BaseAddModalBody";

type AddModalProps = {
    addModalOptions: GalleryBase.ModalOptions,
}

function AddButton(props: AddModalProps){
    const {state, dispatch} = useGalleryContext();

    return (
        <>
            <Modal show={state.showAddModal} onHide={() => dispatch({type: 'toggle_add_modal', value: false})} id='gallery-add-modal'>
                <Modal.Header>{props.addModalOptions.headerText}</Modal.Header>
                <Modal.Body>
                    <BaseAddModalBody additionalContent={props.addModalOptions.bodyContent}/>
                </Modal.Body>
            </Modal>
            <button className="primary add" type="button" onClick={() => dispatch({type: 'toggle_add_modal', value: true})}>Lisää Uusi</button>
        </>
    );
}

type HeaderProps = {
    title: string,
    subTitle: string,
    buttons: JSX.Element[],
}

function Header(props: HeaderProps){
    return (
        <div className={style.galleryHeader}>
            <div className={style.titleContainer}>
                <h1>{props.title}</h1>
                <small>{props.subTitle}</small>
            </div>

            <div className={style.buttonsContainer}>
                {props.buttons}
            </div>
        </div>
    )
}

type BodyProps = {
    error: JSX.Element,
}

function Body(props: BodyProps){
    const {state, dbTableName} = useGalleryContext();

    const cards = state.data.map((entry, index: number) => {
        return getCard(entry, dbTableName, index);
    });

    const loadingMessage = 
        dbTableName === 'properties' ? 'Ladataan Taloja...' 
        : 
        dbTableName === 'propertyEvents' ? 'Ladataan Tapahtumia...'
        :
        dbTableName.includes('Images') ? 'Ladataan Kuvia...'
        :
        dbTableName.includes('Files') ? 'Ladataan Tiedostoja...'
        :
        'Ladataan...';

    return (
        <div className={style.galleryBody}>
            {
                cards.length ? cards : state.isLoading ? <Loading message={loadingMessage}/> : props.error
            }
        </div>
    )
}

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