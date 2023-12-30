import { options } from "kotilogi-app/app/api/auth/[...nextauth]/options";
import db from "kotilogi-app/dbconfig";
import { getServerSession } from "next-auth";

export default async function Page(){
    
    return (
        <>
            <h2>Yleisnäkymä</h2>
        </>
    );
}