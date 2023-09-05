"use client";

import { resetPassword, sendResetCode } from "kotilogi-app/actions/resetPassword";
import { StatusCode } from "kotilogi-app/utils/statusCode";
import Form from "kotilogi-app/components/Form";
import { useEffect, useReducer, useState } from "react";
import resetFormReducer, { State, emailKey } from "./resetFormReducer";
import ResetFormProvider, { useResetFormProvider } from "./ResetFormContext";
import useSessionStorage from 'kotilogi-app/hooks/useSessionStorage';
import { toast } from "react-hot-toast";
import { useRouter, useSearchParams } from "next/navigation";
import Spinner from "kotilogi-app/components/Spinner/Spinner";

function StepOne(){
    const router = useRouter();
    const {dispatch, state, next} = useResetFormProvider();

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        dispatch({
            type: 'set_loading',
            value: true,
        });

        const email = e.target.email.value;
        const status = await sendResetCode(email);

        if(status === StatusCode.SUCCESS){
            toast.success('Varmennuskoodi lähetetty onnistuneesti!');
            dispatch({
                type: 'set_email',
                value: email,
            });
        }

        dispatch({
            type: 'set_status',
            value: status,
        });

        dispatch({
            type: 'set_loading',
            value: false,
        });
    }

    useEffect(() => {
        const timeout = setTimeout(() => {
            dispatch({
                type: 'set_status',
                value: -1,
            });
        }, 3000);

        return () => clearTimeout(timeout);
    }, [state.status])

    return (
        <Form onSubmit={onSubmitHandler}>
            <Form.Group>
                <label>Anna Sähköpostiosoitteesi</label>
                <input type="email" name="email" required></input>
            </Form.Group>

            <Form.ButtonGroup>
                <button type="button" className="secondary" onClick={() => router.replace('/login')}>Peruuta</button>
                <button type="submit" className="primary" disabled={state.isLoading}>
                    {state.isLoading ? <Spinner size="1rem"/> : null} 
                    <span>Seuraava</span>
                </button>
            </Form.ButtonGroup>
            {
                state.status === StatusCode.SUCCESS ? <Form.Success>Varmennuslinkki on lähetetty!</Form.Success>
                :
                state.status === StatusCode.UNEXPECTED ? <Form.Error>Varmennuslinkin lähetys epäonnistui!</Form.Error>
                :
                <></>
            }
        </Form>
    );
}

function StepTwo(){
    const router = useRouter();
    const params = useSearchParams();

    const [isLoading, setIsLoading] = useState(false);
    const {previous, state} = useResetFormProvider();

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        const password1: string = e.target.password1.value;
        const password2: string = e.target.password2.value;
        const verificationCode = params.get('token');
        console.log(verificationCode);

        if(!verificationCode){
            toast.error('Salasanan nollaustodennus puuttuu!');
        }
        else if(password1 !== password2) {
            toast.error('Salasanat eivät täsmää!');
        }
        else{
            const status = await resetPassword(verificationCode, password1);
            switch(status){
                case StatusCode.SUCCESS:{
                    toast.success('Salasana vaihdettu onnistuneesti!');
                    sessionStorage.removeItem(emailKey);
                    router.replace('/login');
                }
                    
                break;
    
                case StatusCode.MISMATCH:
                    toast.error('Varmennuskoodia ei hyväksytty!');
                break;
    
                default: toast.error('Tapahtui odottamaton virhe!');
            }
        }

        setIsLoading(false);
    }

    return (
        <Form onSubmit={onSubmitHandler}>
            <Form.Group>
                <label>Anna Uusi Salasana</label>
                <input type="password" name='password1' required minLength={8}></input>
                <Form.SubLabel>Salasanan tulee olla vähintään 8 merkkiä pitkä.</Form.SubLabel>
            </Form.Group>

            <Form.Group>
                <label>Anna Salasana Uudelleen</label>
                <input type="password" name="password2" required minLength={8}></input>
            </Form.Group>

            <Form.ButtonGroup>
                <button type="button" className="secondary" onClick={() => previous()} disabled={isLoading}>Takaisin</button>
                <button type="submit" className="primary" disabled={isLoading}>Lähetä</button>
            </Form.ButtonGroup>
        </Form>
    );
}

export default function ResetForm(){
    const params = useSearchParams();
    const token = params.get('token');

    const initialValue: State = {
        token,
        step:  token ? 2 : 1,
        status: -1,
        isLoading: false,
    }

    const [state, dispatch] = useReducer(resetFormReducer, initialValue);

    function previous(): void{
        dispatch({
            type: 'step_backwards',
            value: null,
        });
    }

    function next(): void{
        dispatch({
            type: 'step_forward',
            value: null,
        });
    }

    function reset(): void{
        dispatch({
            type: 'reset',
            value: null,
        });
    }

    return (
        <ResetFormProvider state={state as State} next={next} previous={previous} reset={reset} dispatch={dispatch}>
            {    
                state.step === 1 ? <StepOne />
                :
                state.step === 2 ? <StepTwo />
                : 
                null
            }
        </ResetFormProvider>
        
    )
}