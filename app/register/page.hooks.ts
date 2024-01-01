import { registerUser } from "kotilogi-app/actions/registerUser";
import { RegisterError } from "kotilogi-app/utils/error";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";

/**This hook is responsible for handling the logic of the registration form. */
export function useRegisterForm(){
    const rerouteTimeout = useRef<NodeJS.Timeout | undefined>(undefined);
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<RegisterError>('none');
    const params = useSearchParams();
    const plan = params.get('plan') || 'regular';

    const onSubmit = async (e) => {
        e.preventDefault();

        const {password1, password2} = e.target;

        setLoading(true);
        setError('none');

        if(password1.value !== password2.value) {
            setError('password_mismatch');
            setLoading(false);
        }
        else{
            const credentials = {
                email: e.target.email.value,
                password: password1.value,
                plan,
            }

            registerUser(credentials)
            .then(() => {
                setError('success');
                //Automatically reroute to the login page after succesfull registration.
                const loginTransitionTime = 3000;
                rerouteTimeout.current = setTimeout(() => router.replace('/login'), loginTransitionTime);
            })
            .catch(err => {
                const message = err.message;
                if(message.includes('UNIQUE')){
                    setError('user_exists');
                }
                else{
                    setError('unexpected');
                }
                
            })
            .finally(() => setLoading(false));
        }
    }

    const cancelHandler = () => {
        router.replace('/');
    }

    const formEmailField = 'kl-form-register-email';
    const getEmailField = () => sessionStorage && sessionStorage.getItem(formEmailField) as string | undefined;
    const setEmailField = (value: string) => sessionStorage && sessionStorage.setItem(formEmailField, value);

    useEffect(() => {
        //Clear the reroute timeout before each render.
        if(rerouteTimeout.current === null) return;
        return () => clearTimeout(rerouteTimeout.current);
    }, []);

    return {error, loading, onSubmit, cancelHandler};
}