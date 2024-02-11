import { useInputData } from "@/components/Modals/BaseAddModal.hooks";
import { resetPassword } from "kotilogi-app/actions/resetPassword";
import { useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import {useRouter} from 'next/navigation';
import { useState } from "react";

type ResetStepTwoStatus = 'idle' | 'unknown' | 'success' | 'loading';

export function useResetStepTwo(){
    const params = useSearchParams();
    const router = useRouter();
    const {data, updateData} = useInputData({});
    const [status, setStatus] = useState<ResetStepTwoStatus>('idle');

    const resetStepTwoHandler = async (e) => {
        e.preventDefault();
        setStatus('loading');

        const password1: string = data.password1;
        const password2: string = data.password2;

        const verificationCode = params.get('token');

        if(!verificationCode){
            toast.error('Salasanan nollaustodennus puuttuu!');
        }
        else if(password1 !== password2) {
            toast.error('Salasanat eivät täsmää!');
        }
        else{
            resetPassword(verificationCode, password1)
            .then(() => {
                toast.success('Salasana vaihdettu onnistuneesti!');
                router.push('/login');
            })
            .catch(err => {
                toast.error(err.message);
            })
        }
    }

    return {
        status,
        data,
        updateData,
        resetStepTwoHandler,
    }
}