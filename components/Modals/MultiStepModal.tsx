'use client';

import { useToggle } from "kotilogi-app/hooks/useToggle";
import React, { MutableRefObject, Ref, createContext, forwardRef, useContext, useEffect, useImperativeHandle, useRef } from "react";
import { useState } from "react";
import Modal from "./Modal";

type MultiStepModalContextProps = {
    steps: MutableRefObject<number>;
    currentStep: number;
    nextStep: () => void;
    previousStep: () => void;
}

const MultiStepModalContext = createContext<MultiStepModalContextProps>(null);

function NextTrigger({children}: React.PropsWithChildren & {
    onClick?: () => void,
}){
    const {nextStep, currentStep, steps} = useMultiStepModalContext();

    return React.Children.map(children, (child: React.ReactElement) => React.cloneElement(child, {
        ...child.props,
        disabled: currentStep === steps.current - 1,
        onClick: () => {
            if(child.props.onClick){
                child.props.onClick();
            }

            nextStep();
        }
    }));
}

function PreviousTrigger({children}: React.PropsWithChildren & {
    onClick?: () => void,
}){
    const {previousStep, currentStep, steps} = useMultiStepModalContext();

    return React.Children.map(children, (child: React.ReactElement) => React.cloneElement(child, {
        ...child.props,
        disabled: currentStep === 0,
        onClick: () => {
            if(child.props.onClick){
                child.props.onClick();
            }

            previousStep();
        }
    }));
}

/**
 * Contains the steps of the modal. All intended steps must be within this component.
 * @param param0 
 * @returns 
 */
function Steps({children}: React.PropsWithChildren){
    const {currentStep, steps} = useMultiStepModalContext();
    steps.current = React.Children.toArray(children).length;

    return React.Children.toArray(children).at(currentStep);
}

type MultiStepModalProps = React.PropsWithChildren & {
    ref?: Ref<TODO>,
}

export interface MultiStepModalMethods {
    toggleOpen: (state?: boolean) => void,
}

function MultiStepModal({children}: MultiStepModalProps, ref: React.Ref<TODO>){
    const [currentStep, setCurrentStep] = useState(0);
    const {toggled: open, toggleState: toggleOpen} = useToggle(true);
    const dialogRef = useRef<HTMLDialogElement>(null);
    const steps = useRef<number>(0);

    const nextStep = () => setCurrentStep(prev => prev + 1);
    const previousStep = () => setCurrentStep(prev => prev - 1);

    useImperativeHandle(ref, () => ({
        toggleOpen,
    }));

    console.log(currentStep);

    return (
        <MultiStepModalContext.Provider value={{steps, currentStep, nextStep, previousStep}}>
            <Modal show={open} onHide={() => toggleOpen(false)}>
                {children}
            </Modal>
        </MultiStepModalContext.Provider>
    );
}

MultiStepModal.Steps = Steps;
MultiStepModal.NextTrigger = NextTrigger;
MultiStepModal.PreviousTrigger = PreviousTrigger;

function useMultiStepModalContext(){
    const ctx = useContext(MultiStepModalContext);
    if(!ctx) throw new Error('useMultiStepModalContext must be used within the context of a MultiStepModalContext!');
    return ctx;
}

export default Object.assign(forwardRef<MultiStepModalMethods, MultiStepModalProps>(MultiStepModal), {
    Steps,
    NextTrigger,
    PreviousTrigger
});