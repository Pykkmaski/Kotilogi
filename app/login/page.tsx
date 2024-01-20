"use client";

import {signIn} from 'next-auth/react';
import { useSearchParams, useRouter } from 'next/navigation';
import {useState} from 'react';
import SecondaryButton from 'kotilogi-app/components/Button/SecondaryButton';
import PrimaryButton from 'kotilogi-app/components/Button/PrimaryButton';
import { Input } from 'kotilogi-app/components/Input/Input';
import { EditCard } from 'kotilogi-app/components/EditCard/EditCard';
import { Group } from 'kotilogi-app/components/Group/Group';
import Link from 'next/link';
import { useInputData } from 'kotilogi-app/components/Modals/BaseAddModal.hooks';

export default function LoginPage(){
    const router = useRouter();
    const params = useSearchParams();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string>('none')
    const {data, updateData} = useInputData({});

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
            if(res){
                if(res.error){
                    setError(res.error);
                }
                else{
                    setError('success');
                    router.push('/dashboard/properties');
                }
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

    return (
        <main className="flex-column center-all flex-full">
            <EditCard title="Kirjaudu Sisään">
                <Group direction="vertical" gap="0">
                    <form onSubmit={onSubmitHandler}>
                    <Group direction='vertical' alignItems='flex-end'>
                        <Input 
                            label="Sähköpostiosoite"
                            description='Sähköpostiosoite jolle tili on rekisteröity.'
                            type="email" 
                            name="email" 
                            required={true} 
                            placeholder="Kirjoita sähköpostiosoitteesi..."
                            onChange={updateData}
                            />

                        {error === 'invalid_user' ? <span className="danger">Käyttäjää annetulla sähköpostiosoitteella ei ole!</span> : null}
                    </Group>
                    

                    <Group direction="vertical" alignItems='flex-end'>
                        <Input 
                            label="Salasana"
                            description='Tilin salasana.'
                            type="password" 
                            name="password" 
                            placeholder="Kirjoita salasanasi..."
                            required 
                            className={error === 'password_mismatch' ? 'error' : undefined}
                            onChange={updateData}/>
                        {error === 'password_mismatch' ? <span className="danger">Salasana on virheellinen!</span> : null}
                        <div>
                            <span style={{color: 'gray'}}>Unohditko salasanasi? </span><Link href="/login/reset">Klikkaa tähän.</Link>
                        </div>
                    </Group>
                    

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
                            disabled={loading || (!data.email || !data.password)}
                            loading={loading}
                        />
                    </Group>
                    </form>
                </Group>
                
            </EditCard>
        </main>
    )
}