'use client';

import { createContext, useState } from "react";
import Modal, { ModalProps } from "./Modal";
import { Heading } from "../Heading";
import React from "react";

type MultiStepModalContextValue = {
    /**The data grabbed during any of the steps.*/
    data: {}
}

const MultiStepModalContext = createContext<MultiStepModalContextValue | null>(null);

function PaymentPart(props: ModalProps){
    return (
        <Modal {...props}>
            <Modal.Header>
                <Heading>Ostoskori</Heading>
            </Modal.Header>

            <Modal.Body>

            </Modal.Body>

            <Modal.Footer>

            </Modal.Footer>
        </Modal>
    )
}

/**
 * Renders a two-step modal where the primary modal is passed as a child and is rendered in step one, and in step two, renders a payment modal.
 * @param props 
 * @returns 
 */
export function MultiStepModal({children, ...props}: ModalProps){
    const [step, setStep] = useState<number>(0);

    /**The data collected form step one. */
    const [data, setData] = useState(null);

    const steps = React.Children.toArray(children);
    
    const getStep = () => {
        return steps[step];
    }

    return (
        <MultiStepModalContext.Provider value={{data}}>
            {getStep()}
        </MultiStepModalContext.Provider>
    );
}