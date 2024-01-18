"use client";

import styles from './page.module.scss';
import Gradient from 'kotilogi-app/components/Gradient/Gradient';
import { RegisterForm } from './RegisterForm';
import { EditCard } from 'kotilogi-app/components/EditCard/EditCard';
import { Input, Select } from 'kotilogi-app/components/Input/Input';
import { Group } from 'kotilogi-app/components/Group/Group';
import SecondaryButton from 'kotilogi-app/components/Button/SecondaryButton';
import PrimaryButton from 'kotilogi-app/components/Button/PrimaryButton';
import { useInputData, useStatus } from 'kotilogi-app/components/Modals/BaseAddModal.hooks';
import { registerUser } from 'kotilogi-app/actions/registerUser';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

/**This component is responsible for displaying the contents of the register page. */
export default function RegisterPage(){
    const {data, updateData} = useInputData({plan: 'regular'});
    const [status, setStatus] = useStatus('idle');
    const [error, setError] = useState<string | null>(null);
    
    const router = useRouter();

    const checkPasswordMatch = (password1: string, password2: string) => {
        return password1 === password2;
    }

    const register = (e) => {
        e.preventDefault();

        if(!checkPasswordMatch(data.password, e.target.password2.value)){
            setError('password_mismatch');
            return;
        }

        setStatus('loading');

        registerUser(data)
        .then(status => {
            setStatus('idle');
            setError(status);
            if(status === 'success'){
                router.replace('/login');
            }
        })
        .catch(err => {
            setStatus('error');
        });
    }

    const loading = status === 'loading';

    return (
        <main className="flex-column center-all flex-full">
            <EditCard title={'Rekisteröidy'}>
                <p>
                    Rekisteröidy Kotilogin käyttäjäksi tällä lomakkeella.<br/>
                    Perusjäsenyys on maksuton, antaen sinulle työkalut yhden talon tietojen hallinnointiin.<br/>
                    Pro-jäsenyys on maksullinen.
                </p>

                <form onSubmit={register}>
                    <Group direction="vertical" alignItems="flex-end">
                        <Input label="Sähköpostiosoite" description="Anna sähköpostiosoitteesi." onChange={updateData} required
                            placeholder="Kirjoita sähköpostiosoite..." type="email" name="email"/>
                        {error === 'user_exists' ? <span className="danger">Tili annetulla osoitteella on jo olemassa!</span> : null}
                    </Group>
                    
                    
                    <Group direction="vertical" alignItems='flex-end'>
                        <Input label="Salasana" description="Anna tilille salasana." type="password" onChange={updateData} required
                            placeholder="Kirjoita salasana..." autoComplete='new-password' name="password"/>

                        <Input label="Vahvista salasana" description="Kirjoita salasana uudelleen." type="password" required
                            placeholder='Kirjoita salasana uudelleen...' autoComplete='new-password' name="password2" />

                        {error === 'password_mismatch' ? <span className="danger">Salasanat eivät täsmää</span> : null}
                    </Group>
                    

                    <Select name="plan" label="Tilaustyyppi" description="Valitse tilauksesi tyyppi." onChange={updateData} required> 
                        <Select.Option value="regular">Perus</Select.Option>
                        <Select.Option value="pro">Pro</Select.Option>
                    </Select>

                    <Group direction="horizontal" justifyContent='space-between'>
                        <span>Olen lukenut kotilogin käyttöehdot:</span>
                        <input type="checkbox" required />
                    </Group>

                    <Group direction="horizontal" justifyContent='right'>
                        <SecondaryButton desktopText='Peruuta' disabled={loading} onClick={() => router.push('/')}/>
                        <PrimaryButton desktopText='Rekisteröidy' type="submit" disabled={loading} loading={loading}/>
                    </Group>
                </form>
            </EditCard>
        </main>
    )
}