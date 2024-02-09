import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export type LoginStatusType = 'idle' | 'success' | 'unexpected' | 'password_mismatch' | 'invalid_user' | 'loading';

export function useLogin(){
    const router = useRouter();
    const [status, setStatus] = useState<LoginStatusType>('idle');

    const loginHandler = (e) => {
        e.preventDefault();
        setStatus('loading');

        const credentials = {
            email: e.target.email.value,
            password: e.target.password.value,
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
            console.log(err.message);
        });
    }

    return {
        loginHandler,
        status
    }
}