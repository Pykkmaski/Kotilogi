'use client';

import React from "react";
import { useState } from "react";

type MultiStepModalProps = React.PropsWithChildren & {

}

export function MultiStepModal({children, ...props}: MultiStepModalProps){
    const [currentStep, setCurrentStep] = useState(0);
    const steps = React.Children.toArray(children);

    return (
        <dialog>
            {steps[currentStep]}
        </dialog>
    );
}