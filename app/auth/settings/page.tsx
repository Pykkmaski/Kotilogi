import Form from "kotilogi-app/components/Form";
import SettingsForm from "./SettingsForm";

export default function Settings(){
    return (
        <main>
            {/**The header */}
            <div>
                <h1>Tilin Asetukset</h1>
            </div>

            <SettingsForm/>
        </main>
    )
}