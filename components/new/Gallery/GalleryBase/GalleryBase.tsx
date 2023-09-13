"use client";

import { useReducer, useRef, useState } from "react";
import Card from "../Card/Card";
import useGalleryContext, { GalleryContext } from "./GalleryContext";
import Modal from "kotilogi-app/components/Modals/Modal";
import GalleryBaseReducer from "./GalleryBaseReducer";
import style from './gallery.module.scss';
import ItemCard, { ItemType } from "kotilogi-app/components/Cards/ItemCard";
import BodyWithCards from "./BodyWithCards";
import getEntryAsItem from "./getEntryAsItem";
import getCardDestination from "./getCardDestination";
import { throwErrorIfNull } from "kotilogi-app/utils/throwErrorIfNull";
import getCard from "./getCard";

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
                    {props.addModalOptions.bodyContent}
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

function Body(){
    const {state, contentType} = useGalleryContext();

    const cards = state.data.map((entry, index: number) => {
        return getCard(entry, contentType, index);
    });

    return (
        <div className={style.galleryBody}>
            {cards}
        </div>
    )
}

export default function GalleryBase(props: GalleryBase.Props){
    const initialState: GalleryBase.State = {
        data: [...props.data],
        selectedItemIds: [],
        showAddModal: false,
        isLoading: false,
    }

    const [pendingData, setPendingData] = useState({});
    const [state, dispatch] = useReducer(GalleryBaseReducer, initialState);

    const onInputChangeHandler = (e) => {
        setPendingData({
            ...pendingData,
            [e.target.name] : e.target.value,
        });
    }

    const contextValue: GalleryBase.ContextValue = {
        state,
        contentType: props.contentType,
        onInputChangeHandler,
        dispatch,
    }

    const buttons = [
        ...props.headerButtons,
        <AddButton addModalOptions={props.addModalOptions}/>
    ];

    return (
        <div className={style.container}>
            <GalleryContext.Provider value={contextValue}>
                <Header
                    title={props.title}
                    subTitle={props.subTitle}
                    buttons={buttons}
                />

                <Body/>
            </GalleryContext.Provider>
        </div>
    )
}