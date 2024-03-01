'use client';

import Button from "@/components/Button/Button";
import * as users from '@/actions/users';
import toast from "react-hot-toast";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { UserType } from "kotilogi-app/types/UserType";
import { useState } from "react";

type CancelSubscriptionButtonProps = React.ComponentProps<'button'> & {
    user: UserType,
}

export function CancelSubscriptionButton({children, user, ...props}: CancelSubscriptionButtonProps){

    const router = useRouter();
    const [status, setStatus] = useState<'idle' | 'loading'>('idle');

    const cancelSubscription = async () => {
        const c = confirm('Oletko varma että haluat peruuttaa tilauksesi?');
        if(!c) return;
        
        setStatus('loading');

        users.cancelSubscription(user.email)
        .then(() => {
            toast.success('Tilaus peruutettu onnistuneesti!');
            //Log the user out.
            router.replace('/logout');
        })
        .catch(err => {
            toast.error('Tilauksen peruutus ei onnistunut! Yritä pian uudelleen.'); 
        })
        .finally(() => setStatus('idle'));
    }

    return (
        <Button variant="primary" onClick={cancelSubscription} {...props} loading={status === 'loading'} disabled={props.disabled || status === 'loading'}>
            <span className="mx-4">Peruuta tilaus</span>
        </Button>
    )
}