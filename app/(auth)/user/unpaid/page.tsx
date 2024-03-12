import { options } from "kotilogi-app/app/api/auth/[...nextauth]/options"
import { getServerSession } from "next-auth"
import { PaymentButton } from "./PaymentButton";
import db from "kotilogi-app/dbconfig";
import { formatNumber } from "kotilogi-app/utils/formatNumber";
import Link from "next/link";
import Button from "@/components/Button/Button";

export default async function UnpaidCartPage(){
    const session = await getServerSession(options as any) as any;
    const bills = await db('carts').where({customer: session.user.email}).then(async ([cart]) => {
        if(!cart){
            return [];
        }

        return await db('cartItems').where({cartId: cart.id});
    });

    const totalBill = bills.reduce((acc, cur) => acc += cur.amount, 0);

    return (
        <main className="flex flex-col justify-center items-center flex-1 text-slate-600">
            <div className="flex justify-center gap-4">
                <div className="flex flex-col gap-4 flex-3">
                    <h1 className="text-2xl text-slate-500 font-semibold">Ostoskorisi on maksamatta</h1>
                    <p className="text-lg">
                        Ostoskorisi on erääntynyt. Ei kuitenkaan hätää.<br/>
                        Voit jatkaa Kotidokin käyttöä heti kun olet suorittanut maksun.
                    </p>

                    <h2 className="mt-8 text-xl text-slate-500 font-semibold">Sinulla on erääntyneitä maksuja yhteensä:</h2>
                    <span className="text-4xl text-green-600">{formatNumber(totalBill / 100)}€</span>

                    <div className="mt-4 flex gap-4 items-center font-semibold">
                        <PaymentButton>
                            <span className="mx-4 font-semibold text-slate-600">Maksa nyt</span>
                        </PaymentButton>
                    </div>
                </div>
            </div>
        </main>
    )
}