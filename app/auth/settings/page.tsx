import Form from "kotilogi-app/components/Form";
import SettingsForm from "./SettingsForm";
import { getServerSession } from "next-auth";

export default async function Settings(){
    const session = await getServerSession();
    if(!session) throw new Error('Failed to load settings! User is not logged in.');

    return (
        <main>
            {/**The header */}
            <div>
                <h1>Tilin Asetukset</h1>
            </div>

            <SettingsForm user={session!.user}/>
        </main>
    )
}