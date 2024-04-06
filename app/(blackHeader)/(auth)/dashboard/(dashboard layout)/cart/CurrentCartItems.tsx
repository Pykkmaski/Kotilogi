import Link from "next/link";
import {CartPropertyItem } from "./CartPropertyItem";
import { CartBillItem } from "./CartBillItem";

export function CurrentCartItems({activeProperties, bills}){
    return (
        <div className="flex flex-col gap-2 flex-1">
            <div className="flex flex-col gap-2">
                <div className="flex gap-4 items-center mb-4">
                    <h2 className="text-xl text-slate-500 font-semibold">Nykyiset veloittavat talot</h2>
                    <Link href="/dashboard/properties" className="text-orange-500 text-sm">Siirry Taloihin</Link>
                </div>
                
                {
                    activeProperties?.map(property => <CartPropertyItem property={property}/>)
                }
            </div>

            <div className="flex flex-col gap-2 flex-1 mt-8">
                <div className="flex gap-4 items-center mb-4">
                    <h2 className="text-xl text-slate-500 font-semibold">Muut laskut</h2>
                </div>
                
                {
                    bills?.map(bill => <CartBillItem bill={bill}/>)
                }
            </div>
        </div>
        
    );
}