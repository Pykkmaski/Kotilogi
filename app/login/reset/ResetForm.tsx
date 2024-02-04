"use client";

import { resetPassword, sendResetCode } from "kotilogi-app/actions/resetPassword";
import { StatusCode } from "kotilogi-app/utils/statusCode";
import Form from "kotilogi-app/components/Form/Form";
import { useEffect, useReducer, useState } from "react";
import resetFormReducer, { State, emailKey } from "./resetFormReducer";
import ResetFormProvider, { useResetFormProvider } from "./ResetFormContext";
import { toast } from "react-hot-toast";
import { useRouter, useSearchParams } from "next/navigation";
import { ErrorCode } from "kotilogi-app/constants";
import Button from "kotilogi-app/components/Button/Button";
import SecondaryButton from "kotilogi-app/components/Button/SecondaryButton";
import PrimaryButton from "kotilogi-app/components/Button/PrimaryButton";
import { Group } from "kotilogi-app/components/Group/Group";
import { Input } from "kotilogi-app/components/Input/Input";
import { ContentCard } from "kotilogi-app/components/RoundedBox/RoundedBox";
import { useInputData } from "kotilogi-app/components/Modals/BaseAddModal.hooks";
import { ErrorText, SuccessText } from "kotilogi-app/components/Util/Text";

function StepOne(){
    const router = useRouter();
    const {dispatch, state, next} = useResetFormProvider();
    const {data, updateData} = useInputData({});
    const [submitDisabled, setSubmitDisabled] = useState(false);

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        dispatch({
            type: 'set_loading',
            value: true,
        });

        const email = e.target.email.value;
        const error = await sendResetCode(email);

        if(error.code === StatusCode.SUCCESS){
            toast.success('Varmennuskoodi lähetetty onnistuneesti!');
            dispatch({
                type: 'set_email',
                value: email,
            });

            setSubmitDisabled(true);
        }
        else{
            dispatch({
                type: 'set_status',
                value: error.code,
            });
        }

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
                            disabled={state.isLoading}
                        >Peruuta</SecondaryButton>

                        <PrimaryButton 
                            type="submit" 
                            disabled={state.isLoading || !data.email || submitDisabled}
                            loading={state.isLoading}
                        >Lähetä</PrimaryButton>
                    </Group>
                </div>
                
                {
                    state.status === StatusCode.SUCCESS ? <SuccessText>Varmennuslinkki on lähetetty!</SuccessText>
                    :
                    state.status === StatusCode.UNEXPECTED ? <ErrorText>Varmennuslinkin lähetys epäonnistui!</ErrorText>
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
    const {previous, state} = useResetFormProvider();
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
            const error = await resetPassword(verificationCode, password1);

            switch(error.code){
                case ErrorCode.SUCCESS:{
                    toast.success('Salasana vaihdettu onnistuneesti!');
                    sessionStorage.removeItem(emailKey);
                    router.replace('/login');
                }
                    
                break;
    
                case ErrorCode.INVALID_RESETCODE:
                    toast.error('Varmennuskoodia ei hyväksytty!');
                break;
    
                default: toast.error('Tapahtui odottamaton virhe!');
            }
        }

        setIsLoading(false);
    }

    return (
        <ContentCard title="Luo Uusi Salasana">
            <p>
                Luo uusi salasana tällä lomakkeella. <br/>
                Salasana tulee vaihtaa 30 minuutin sisällä.
            </p>

            <div className="w-full [&>*]:flex-1">
            <form onSubmit={onSubmitHandler} className="mt-4">
                <Group direction="col" gap={4}>
                    <Group direction="row">
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
                    </Group>

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
                </Group>
            </form>
            </div>
            
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