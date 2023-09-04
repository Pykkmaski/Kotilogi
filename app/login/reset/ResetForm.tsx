"use client";

import { resetPassword, sendResetCode } from "kotilogi-app/actions/resetPassword";
import { StatusCode } from "kotilogi-app/utils/statusCode";
import Form from "kotilogi-app/components/Form";
import { useReducer, useState } from "react";
import resetFormReducer, { State, emailKey } from "./resetFormReducer";
import ResetFormProvider, { useResetFormProvider } from "./ResetFormContext";
import useSessionStorage from 'kotilogi-app/hooks/useSessionStorage';
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

function StepOne(){
    const router = useRouter();
    const {dispatch, state, next} = useResetFormProvider();

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const status = await sendResetCode(email);

        switch(status){
            case StatusCode.SUCCESS:{
                toast.success('Varmennuskoodi lähetetty onnistuneesti!');
                dispatch({
                    type: 'set_email',
                    value: email,
                });
                next();
            }
            break;

            default:{
                dispatch({
                    type: 'set_error',
                    value: status,
                });
            }
        }
    }

    return (
        <Form onSubmit={onSubmitHandler}>
            <Form.Group>
                <label>Anna Sähköpostiosoitteesi</label>
                <input type="email" name="email" required></input>
            </Form.Group>

            <Form.ButtonGroup>
                <button type="button" className="secondary" onClick={() => router.replace('/login')}>Peruuta</button>
                <button type="submit" className="primary">Seuraava</button>
            </Form.ButtonGroup>
        </Form>
    );
}

function StepTwo(){
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const {previous, state} = useResetFormProvider();

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        const password1: string = e.target.password1.value;
        const password2: string = e.target.password2.value;

        if(password1 !== password2) {
            toast.error('Salasanat eivät täsmää!');
        }
        else{
            const verificationCode = e.target.verificationCode.value;
            const status = await resetPassword(verificationCode, password1, state.email as string);
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

            <Form.Group>
                <label>Vahvistuskoodi</label>
                <input type="text" name="verificationCode" required></input>
                <Form.SubLabel>Vahvistuskoodi on lähetetty sähköpostiisi.</Form.SubLabel>
            </Form.Group>

            <Form.ButtonGroup>
                <button type="button" className="secondary" onClick={() => previous()} disabled={isLoading}>Takaisin</button>
                <button type="submit" className="primary" disabled={isLoading}>Lähetä</button>
            </Form.ButtonGroup>
        </Form>
    );
}

export default function ResetForm(){
    const {value: savedEmail} = useSessionStorage(emailKey);

    const initialValue: State = {
        email: savedEmail,
        step: savedEmail ? 2 : 1,
        error: null,
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
        <ResetFormProvider state={state} next={next} previous={previous} reset={reset} dispatch={dispatch}>
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