import { Heading } from "@/components/Heading";
import { TransferForm } from "./TransferForm";
import db from "kotilogi-app/dbconfig";

export default async function TransferPage(){
    return (
        <main className="flex flex-col w-full">
            <Heading>Siirrä Omistajuus</Heading>

            <span className="text-lg text-red-500">Tämä toiminto ei ole vielä valmis!</span>
            <p className="text-slate-500 mt-4">
                Luo tällä lomakkeella varmenne, jolla toinen Kotidokin käyttäjä voi siirtää talon omistajuuden itselleen.<br/>
                Talon omistajuuden siirto on pysyvä, mikäli vastaanottaja käyttää varmenteen ennenkuin se umpeutuu.
            </p>
            <div className="mt-8 md:w-[50%]">
                <TransferForm/>
            </div>
        </main>
    );
}