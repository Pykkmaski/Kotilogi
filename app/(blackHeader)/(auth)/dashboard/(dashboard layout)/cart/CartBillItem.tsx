'use client';

import { useState } from "react";
import { formatNumber } from "kotilogi-app/utils/formatNumber";
import Button from "@/components/Button/Button";
import { useRouter } from "next/navigation";
import { useBillsContext } from "./Bills";

type CartBillItemProps = {
    bill: TODO;
    onSelect: (bill: TODO) => void;
}

export function CartBillItem({bill, onSelect}: CartBillItemProps){
    const [property, setProperty] = useState(null);
    const {status, pay} = useBillsContext();

    const router = useRouter();

    const getType = () => {
        if(bill.stamp === 'activate_property'){
            return 'Talon käyttöönotto';
        }
        else if(bill.stamp === 'add_property'){
            return 'Talon lisäys';
        }
        else if(bill.stamp === 'charge_property'){
            return 'Talon vuosimaksu';
        }
        else{
            return bill.stamp;
        }
    }

    const isDue = Date.now() >= parseInt(bill.due);
    const amount = formatNumber(bill.amount / 100);
    const loading = status === 'loading';

    return (
        <div className="flex flex-col rounded-lg shadow-md p-2 bg-white">
            <div className="flex justify-between items-center w-full">
                <div className="flex flex-row gap-8 w-[50%] justify-evenly">
                    <div className="flex flex-col flex-1 w-full">
                        <small className="text-sm text-slate-500">Tyyppi</small>
                        <span className="text-base">{getType()}</span>
                    </div>
                </div>

                <div className="flex gap-8 items-center">
                    <div className="flex flex-col">
                        <small className="text-slate-500 text-right">Eräpäivä</small>
                        <span className='text-base'>{
                            isDue ? <span className="text-red-700">Heti!</span>
                            :
                            new Date(parseInt(bill.due)).toLocaleDateString('fi-FI')
                        }</span>
                    </div>

                    <div className="flex flex-col">
                        <small className="text-slate-500 text-right">Määrä</small>
                        <span className="text-green-700">{amount}€</span>
                    </div>
                </div>
                
            </div>

            <div className="flex w-full items-center justify-end border-t border-slate-200 pt-2 mt-4">
                <Button variant="primary-dashboard" disabled={loading} onClick={() => pay([bill])}>
                    <span className="mx-4">Maksa</span>
                </Button>
            </div>
        </div>
    );
}