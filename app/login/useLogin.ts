import { useInputData } from "@/components/Modals/BaseAddModal.hooks";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

export type LoginStatusType = 'idle' | 'success' | 'unexpected' | 'password_mismatch' | 'invalid_user' | 'loading' | 'trial_expired' | 'user_inactive';

export function useLogin(){
    const router = useRouter();
    const [status, setStatus] = useState<LoginStatusType>('idle');
    const {data, updateData} = useInputData({});

    const loginHandler = (e) => {
        e.preventDefault();
        setStatus('loading');

        const data = {
            email: e.target.email.value,
            password: e.target.password.value,
        }

        const credentials = {
            ...data,
            redirect: false,
        }

        signIn('credentials', credentials)
        .then(res => {
            if(res){
                if(res.error){
                    setStatus(res.error as any);
                }
                else{
                    setStatus('success');
                    router.push('/dashboard/properties');
                }
            }
        })
        .catch(err => {
            toast.error(err.message);
        });
    }

    return {
        loginHandler,
        status,
        data,
        updateData,
    }
}