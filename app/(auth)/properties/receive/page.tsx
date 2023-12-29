import { getServerSession } from "next-auth";
import { ReceivePropertyForm } from "./ReceivePropertyForm";
import { options } from "kotilogi-app/app/api/auth/[...nextauth]/options";

export default async function Page(){
    const session = await getServerSession(options) as {user: {email: string}};
    if(!session) throw new Error('Failed to load signin session!');

    return (
        <>
            <h2>Vastaanota talon omistajuus</h2>
            <ReceivePropertyForm newOwner={session.user.email}/>
        </>
    )
}