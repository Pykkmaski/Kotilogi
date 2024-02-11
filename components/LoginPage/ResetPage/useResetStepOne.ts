import { useInputData } from "@/components/Modals/BaseAddModal.hooks";
import { sendResetCode } from "kotilogi-app/actions/resetPassword";
import { useState } from "react";
import toast from "react-hot-toast";

export type ResetStepOneStatus = 'idle' | 'unknown' | 'invalid_email' | 'success' | 'loading';

export function useResetStepOne(){
    const [status, setStatus] = useState<ResetStepOneStatus>('idle');
    const {data, updateData} = useInputData({});

    const resetStepOneHandler = (e) => {
        e.preventDefault();
        setStatus('loading');

        const email = data.email;

        sendResetCode(email)
        .then(() => {
            toast.success('Varmennuskoodi lähetetty onnistuneesti!');
            setStatus('success');
        })
        .catch(err => {
            setStatus(err.message);
        });
    }

    return {
        status,
        data,
        updateData,
        resetStepOneHandler,
    }
}