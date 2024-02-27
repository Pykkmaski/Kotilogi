import { options } from "kotilogi-app/app/api/auth/[...nextauth]/options"
import { getServerSession } from "next-auth"
import { PaymentButton } from "./PaymentButton";

export default async function ConfirmEmailPage(){
    const session = await getServerSession(options as any);

    return (
        <main className="flex flex-col justify-center items-center flex-1 text-slate-600">
            <div className="flex justify-center gap-4">
                <div className="flex flex-col gap-4 flex-3">
                    <h1 className="text-2xl text-slate-500 font-semibold">Tilauksesi on maksamatta</h1>
                    <p className="text-lg">
                        Tilauksesi automaattinen määräaikainen veloitus on jostain syystä epäonnistunut.
                    </p>

                    <div className="mt-4 flex gap-4 items-center font-semibold">
                        <PaymentButton session={session}>
                            <span className="mx-4 font-semibold text-slate-600">Maksa nyt</span>
                        </PaymentButton>
                    </div>
                </div>
            </div>
        </main>
    )
}