'use client';

import { signOut } from "next-auth/react";

export default function LogoutButton(){
    return (
        <button className="primary" onClick={async () => await signOut()}>Kirjaudu Ulos</button>
    );
}