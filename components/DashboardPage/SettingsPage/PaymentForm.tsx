'use client';

import Button from "@/components/Button/Button";
import Modal, { ModalProps } from "@/components/Modals/Modal";
import { UserType } from "kotilogi-app/types/UserType";
import { useRef } from "react";
import axios from 'axios';
import crypto from 'crypto';
import { useRouter } from "next/navigation";
import { Prices } from "kotilogi-app/constants";
import * as payments from '@/actions/payments';

const Sublabel = ({children}) => (
    <div className="text-slate-500 text-sm">{children}</div>
);

const Group = ({children}) => (
    <div className="flex flex-col gap-2 w-full">{children}</div>
)

type PaymentFormProps = ModalProps & {
    session: {user: UserType}
}

export function PaymentForm({session, ...props}: PaymentFormProps){
    const router = useRouter();
    const vismaFrameRef = useRef<HTMLIFrameElement>(null);
    
    return (
        <Modal {...props}>
            <Modal.Header>Maksu</Modal.Header>
                <form className="flex flex-col gap-4 my-8 p-4 justify-center" >
                    
                <iframe 
                    ref={vismaFrameRef} 
                    id="iframe" 
                    height="220px" 
                    src="https://www.vismapay.com/e-payments/embedded_card_form?lang=fi" 
                    className="w-full overflow-hidden p-0"/>

                    <Button variant="primary" type="submit">
                        <span className="mx-4 w-full font-semibold">Maksa</span>
                    </Button>
                </form>
        </Modal>
    )
}