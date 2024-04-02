'use client';

import { useEffect, useState } from "react";
import * as database from '@/actions/database';
import toast from "react-hot-toast";
import Spinner from "@/components/Spinner/Spinner";

type CartItemProps = {
    item: TODO;
}

export function CartItem({item}: CartItemProps){
    const [property, setProperty] = useState(null);
    const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
    
    const getContent = () => {
        if(status === 'loading'){
            return <Spinner size="2rem"/>
        }
        else if(status === 'error'){
            return <h2 className="font-semibold">Talotietojen lataus epäonnistui!</h2>
        }
        else{
            return (
                <>
                    <h2 className="text-xl">{property.title}</h2>
                </>
            );
        }
    }
    useEffect(() => {
        //Fetch the actual property of the cart item by its refId.
        database.get('properties', {id: item.refId})
        .then(([property]) => {
            setProperty(property);
            setStatus('success');
        })
        .catch(err => {
            toast.error(err.message);
            setStatus('error');
        });
    }, []);

    return (
        <div className="flex justify-between items-center rounded-lg shadow-md p-2 bg-white">
           {getContent()}
        </div>
    )
}