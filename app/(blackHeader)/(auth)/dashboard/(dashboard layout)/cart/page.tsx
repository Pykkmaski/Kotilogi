import { options } from "kotilogi-app/app/api/auth/[...nextauth]/options";
import { Header } from "kotilogi-app/components/Header/Header";
import { Heading } from "kotilogi-app/components/Heading";
import { getServerSession } from "next-auth";
import { UserType } from "kotilogi-app/types/UserType";
import db from "kotilogi-app/dbconfig";
import { formatNumber } from "kotilogi-app/utils/formatNumber";
import { PaymentButton } from "./PaymentButton";
import { Receipts } from "./Receipts";
import Link from "next/link";

const BillItem = ({bill}) => {
    return (
        <div className="w-full rounded-md shadow-md flex flex-row">

        </div>
    );
} 

export default async function CartPage(){
    const session = await getServerSession(options as any) as {user: UserType};
    const [cart, bills] = await db('carts').where({customer: session.user.email}).then(async ([cart]) => {
        if(!cart){
            return [null, []];
        }

        return db('cartItems').where({cartId: cart.id}).then(async cartItems => {
            return [ cart, cartItems.map(item => ({
                ...item,
                due: cart.due
            })) ];
        });
    });

    const receipts = await db('receipts').where({customer: session.user.email});

    const due = cart?.due;

    const dueDate = due ? new Date(parseInt(due)) : null;
    const totalBill = bills.reduce((acc, cur) => acc += cur.amount, 0);

    const dateClassName = [
        'text-lg',
        dueDate && dueDate.getTime() < Date.now() ? 'text-red-500' : 'text-black',
    ];

    return (    
        <main className="flex flex-col gap-4 mb-10">
            <Header>
                <Heading>Ostoskori</Heading>
            </Header>

            <div className="flex gap-10 items-end">
                <div className="flex flex-col">
                    <small className="text-sm mt-4">Erääntyy:</small>
                    <span className={dateClassName.join(' ')}>{dueDate ? dueDate.toLocaleDateString('fi') : 'Sinulla ei ole erääntyviä maksuja.'}</span>
                </div>

                <span className="text-2xl text-green-600">
                    {formatNumber(totalBill / 100)}€
                </span>
            </div>

            <div className="mt-8 flex flex-col">
                <span className="text-slate-500">Maksupalvelun tarjoaa Visma Pay.</span>
                <div className="w-full justify-end mt-4">
                    <PaymentButton disabled={bills.length === 0}>
                        <span className="mx-8">Maksa nyt</span>
                    </PaymentButton>
                </div>

                <small className="text-sm text-slate-500 mt-4">
                    Kotidok ei suorita maksujen palautuksia.<br/>
                    Ongelmatilanteissa <a href="mailto:kotidok.service@gmail.com" className="text-orange-500">ota yhteyttä.</a>
                </small>

                <Link target="_blank" href="/tos/payments" className="text-orange-500 mt-4">Maksuehdot</Link>
            </div>

            <img src="https://static.vismapay.com/pay_banners/row.png"/>

            <Receipts receipts={receipts}/>
        </main>
    );
}