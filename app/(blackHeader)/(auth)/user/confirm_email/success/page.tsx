import { serviceName } from "kotilogi-app/constants";
import Link from "next/link";
import { ReloginButton } from "./ReloginButton";

export default async function EmailConfirmSuccessPage(){
    return (
        <main className="w-full h-full flex flex-row gap-4 items-center justify-center flex-1">
            <div className="flex justify-center gap-4">
                <div className="flex flex-col gap-4 flex-3">
                    <h1 className="text-2xl text-slate-500 font-semibold">Tilin aktivointi onnistui!</h1>
                    <p className="text-lg">
                        Tilisi on nyt aktiivinen! Sinun on kirjauduttava ulos että muutokset tulevat voimaan.
                    </p>

                    <div className="mt-4 flex gap-4 items-center font-semibold">
                        <Link href="/checkout?cp=trial">
                            <ReloginButton>
                                <span className="mx-8 font-semibold">Kirjaudu ulos nyt</span>
                            </ReloginButton>
                        </Link>
                    </div>
                </div>
            </div>
        </main>
    );
}