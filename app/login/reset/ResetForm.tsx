"use client";

import { resetPassword, sendResetCode } from "kotilogi-app/actions/resetPassword";
import { StatusCode } from "kotilogi-app/utils/statusCode";
import { useEffect, useReducer, useState } from "react";
import resetFormReducer, { State, emailKey } from "./resetFormReducer";
import ResetFormProvider, { useResetFormProvider } from "./ResetFormContext";
import { toast } from "react-hot-toast";
import { useRouter, useSearchParams } from "next/navigation";
import { ErrorCode } from "kotilogi-app/constants";
import {SecondaryButton} from "kotilogi-app/components/Button/SecondaryButton";
import {PrimaryButton} from "kotilogi-app/components/Button/PrimaryButton";
import { Group } from "kotilogi-app/components/Group";
import { Input } from "kotilogi-app/components/Input/Input";
import { ContentCard } from "kotilogi-app/components/RoundedBox/RoundedBox";
import { useInputData } from "kotilogi-app/components/Modals/BaseAddModal.hooks";
import { ErrorText, SuccessText } from "kotilogi-app/components/Util/Text";

function StepOne(){
    const router = useRouter();
    const {dispatch} = useResetFormProvider();
    const {data, updateData} = useInputData({});
    const [status, setStatus] = useState<'success' | 'error' | 'loading' | 'idle'>('idle');

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        setStatus('loading');

        const email = e.target.email.value;

        sendResetCode(email)
        .then(() => {
            toast.success('Varmennuskoodi lähetetty onnistuneesti!');
            setStatus('success');

            dispatch({
                type: 'set_email',
                value: email,
            });
        })
        .catch(err => {
            dispatch({
                type: 'set_status',
                value: err.code,
            });

            setStatus('error');
        });
    }

    useEffect(() => {
        if(status !== 'error') return;

        const timeout = setTimeout(() => {
            setStatus('idle');
        }, 3000);

        return () => clearTimeout(timeout);
    }, [status])

    const isDisabled = () => status === 'loading' || status === 'success';

    return (
        <ContentCard title={"Nollaa salasanasi"}>
            <p>
                Anna sähköpostiosoitteesi. Lähetämme antamaasi osoitteeseen linkin,<br/> jonka kautta pääset nollaamaan salasanasi.<br/>
                Sähköpostin saapumiseen saattaa mennä muutama minuutti.
            </p>

            <form onSubmit={onSubmitHandler}>
                <Group direction="row">
                    <Input 
                        type="email" 
                        name="email"
                        label="Sähköpostiosoite"
                        description="Anna sähköpostiosoitteesi." 
                        placeholder="Kirjoita sähköpostiosoitteesi..."
                        required
                        onChange={updateData}/>
                </Group>

                <div className="mt-4">
                    <Group direction="row" justify="end" gap={2}>
                        <SecondaryButton 
                            type="button"
                            onClick={() => router.push('/login')}
                            disabled={status === 'loading' || isDisabled()}
                        >Peruuta</SecondaryButton>

                        <PrimaryButton 
                            type="submit" 
                            disabled={!data.email || isDisabled()}
                            loading={status === 'loading'}
                        >Lähetä</PrimaryButton>
                    </Group>
                </div>
                
                {
                    status === 'success' ? <SuccessText>Varmennuslinkki on lähetetty! Tarkista sähköpostisi.</SuccessText>
                    :
                    status === 'error' ? <ErrorText>Varmennuslinkin lähetys epäonnistui!</ErrorText>
                    :
                    <></>
                }
            </form>
        </ContentCard>
        
    );
}

function StepTwo(){
    const router = useRouter();
    const params = useSearchParams();

    const [isLoading, setIsLoading] = useState(false);
    const {previous} = useResetFormProvider();
    const {data, updateData} = useInputData({});

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        const password1: string = e.target.password1.value;
        const password2: string = e.target.password2.value;
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
                sessionStorage.removeItem(emailKey);
                router.push('/login');
            })
            .catch(err => {
                toast.error(err.message);
            })
        }

        setIsLoading(false);
    }

    return (
        <ContentCard title="Luo Uusi Salasana">
            <p>
                Luo uusi salasana tällä lomakkeella. <br/>
                Salasana tulee vaihtaa 30 minuutin sisällä.
            </p>

            <form onSubmit={onSubmitHandler} className="w-full mt-4 flex flex-col gap-4">
                <Input 
                    autoComplete="new-password"
                    type="password" 
                    name='password1' 
                    label="Anna Uusi Salasana"
                    description="Tilisi uusi salasana."
                    placeholder="Kirjoita uusi salsanasi..."
                    required 
                    minLength={8}
                    onChange={updateData}/>
           

                <div className="w-full">
                    <Group direction="row">
                        <Input 
                            label="Toista Salasana"
                            description="Uuden salsanan vahvistus."
                            placeholder="Kirjoita salasana uudelleen..."
                            type="password" 
                            name="password2" 
                            required 
                            minLength={8}
                            onChange={updateData}/>
                    </Group>
                </div>
        
                <div className="mt-4 w-full">
                    <Group direction="row" justify="end">
                        <SecondaryButton onClick={previous} disabled={isLoading}>Takaisin</SecondaryButton>
                        <PrimaryButton type="submit" disabled={isLoading || !data.password1 || !data.password2} loading={isLoading}>Lähetä</PrimaryButton>
                    </Group>
                </div>
            </form>
        </ContentCard>
        
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