'use client'

import { useState } from "react";
import { PrimaryButton } from "../Button/PrimaryButton"
import { PaymentModal } from "./PaymentModal";
import toast from "react-hot-toast";

export function MakePaymentButton(){
    const [showPaymentModal, setShowPaymentModal] = useState(false);

    const submitPayment = () => {
        toast.error('Toimintoa ei ole vielä sovellettu!');
    }
    
    return (
        <>
            <PaymentModal show={showPaymentModal} onHide={() => setShowPaymentModal(false)} id="payment-modal"/>
            <PrimaryButton onClick={submitPayment}>Maksa Nyt</PrimaryButton>
        </>
    )
}