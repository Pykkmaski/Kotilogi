import { useInputData } from "@/components/Modals/BaseAddModal.hooks";
import { useState } from "react";

export type ResetStepOneStatus = 'idle' | 'unknown' | 'invalid_email' | 'success';

export function useResetStepOne(){
    const [status, setStatus] = useState<ResetStepOneStatus>('idle');
    const {data, updateData} = useInputData({});

    const resetStepOneHandler = (e) => {
        e.preventDefault();
    }

    return {
        status,
        updateData,
        resetStepOneHandler,
    }
}