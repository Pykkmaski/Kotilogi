import { useInputData } from "@/components/Modals/BaseAddModal.hooks";
import { registerUser } from "kotilogi-app/actions/registerUser";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

export type RegisterStatusType = 'idle' | 'unexpected' | 'user_exists' | 'password_mismatch' | 'loading';
export type RegisterDataType = {
    email?: string,
    password1?: string,
    password2?: string,
    plan: 'regular' | 'pro',
}

export function useRegister(){
    const router = useRouter();
    const {data, updateData} = useInputData({plan: 'regular'});
    const [status, setStatus] = useState<RegisterStatusType>('idle');

    const checkPasswordMatch = (password1: string, password2: string) => {
        return password1 === password2;
    }

    const registerHandler = (e) => {
        console.log('Calliing the register handler...');
        e.preventDefault();
        
        if(!checkPasswordMatch(data.password, e.target.password2.value)){
            setStatus('password_mismatch');
        }
        else{
            setStatus('loading');

            registerUser(data)
            .then(status => {
                setStatus('idle');
                toast.success('Rekisteröityminen onnistui!');
                router.replace('/login');
            })
            .catch(err => {
                setStatus(err.message);
            });
        }
    }

    return {
        registerHandler,
        data,
        updateData,
        status,
    }
}