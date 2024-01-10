"use client";

import styles from './page.module.scss';
import Form from 'kotilogi-app/components/Form/Form';
import {signIn} from 'next-auth/react';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
import {useState, useRef} from 'react';
import Gradient from 'kotilogi-app/components/Gradient/Gradient';
import SecondaryButton from 'kotilogi-app/components/Button/SecondaryButton';
import PrimaryButton from 'kotilogi-app/components/Button/PrimaryButton';
import { Input } from 'kotilogi-app/components/Input/Input';
import { LoginError } from 'kotilogi-app/utils/error';
import { EditCard } from 'kotilogi-app/components/EditCard/EditCard';
import { Group } from 'kotilogi-app/components/Group/Group';

export default function LoginPage(){
    const router = useRouter();
    const params = useSearchParams();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<LoginError>('none')

    const formEmail = 'kl-login-form-email';

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        setLoading(true);

        const credentials = {
            email: e.target.email.value,
            password: e.target.password.value,
            redirect: false,
        }

        signIn('credentials', credentials)
        .then(res => {
            if(res && res.error){
                setError(res.error as LoginError);
            }
            else{
                setError('success');
                router.push('/dashboard/properties');
            }
        })
        .catch(err => {
            console.log(err.message);
        })
        .finally(() => setLoading(false));

    }

    const cancelHandler = () => {
        router.push('/');
    }
    
    const getEmailField = () => sessionStorage && sessionStorage.getItem(formEmail) as string | undefined;
    const setEmailField = (value: string) => {
        if(!sessionStorage) return '';

        sessionStorage.setItem(formEmail, value);
    }

    return (
        <div className={styles.container}>
            
            <EditCard title="Kirjaudu Sisään">
                <form onSubmit={onSubmitHandler}>
                    <Input 
                        label="Sähköpostiosoite"
                        description='Sähköpostiosoite jolle tili on rekisteröity.'
                        type="email" 
                        name="email" 
                        required={true} 
                        placeholder="Kirjoita sähköpostiosoitteesi..."
                        defaultValue={getEmailField()}
                        onChange={(e) => setEmailField(e.target.value)}/>

                    <Input 
                        label="Salasana"
                        description='Tilin salasana.'
                        type="password" 
                        name="password" 
                        placeholder="Kirjoita salasanasi..."
                        required 
                        className={error === 'password_mismatch' ? 'error' : undefined}/>

                    <Group direction="horizontal" justifyContent="flex-end">
                        <SecondaryButton 
                            desktopText='Peruuta' 
                            type="button" 
                            disabled={loading} 
                            onClick={cancelHandler}
                        />

                        <PrimaryButton 
                            desktopText='Kirjaudu'
                            type="submit"
                            disabled={loading}
                            loading={loading}
                        />
                    </Group>
                    
                    {
                        error &&
                        error === 'invalid_user' ? <Form.Error>Tiliä annetulla käyttäjätunnuksella ei ole!</Form.Error>
                        :
                        error === 'password_mismatch' ? <Form.Error>Annettu salasana on väärä!</Form.Error>
                        :
                        error === 'unexpected' ? <Form.Error>Tuntematon Virhe!</Form.Error>
                        :
                        <></>
                    }
                </form>
            </EditCard>
        </div>
    )
}