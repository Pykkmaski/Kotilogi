import { useRouter } from "next/navigation";
import { useResetFormProvider } from "./ResetFormContext";
import { useInputData } from "@/components/Modals/BaseAddModal.hooks";
import { useEffect, useState } from "react";
import { sendResetCode } from "kotilogi-app/actions/resetPassword";
import toast from "react-hot-toast";
import { ContentCard } from "@/components/RoundedBox/RoundedBox";
import { Group } from "@/components/Group";
import { Input } from "@/components/Input/Input";
import { PrimaryButton } from "@/components/Button/PrimaryButton";
import { SecondaryButton } from "@/components/Button/SecondaryButton";
import { SuccessText, ErrorText } from "@/components/Util/Text";

export function StepOne(){
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