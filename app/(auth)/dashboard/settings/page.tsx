import { options } from "kotilogi-app/app/api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import { SettingsForm } from "./SettingsForm";
import Link from "next/link";

export default async function Page(){
    const session = await getServerSession(options) as {user: {email: string}};
    if(!session) throw new Error('Failed to fetch logged in user!');

    return (
        <>
            <h2>Tilin asetukset</h2>
            <SettingsForm email={session.user.email} />
            <Link href="">Päivitä Tili</Link>
        </>
    )
}