import { options } from "kotilogi-app/app/api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import Link from "next/link"
import Button from "../Button/Button";

export async function IndexHeader(){
    const session = await getServerSession(options as any) as any;

    const Logo = () => (
        <Link href="/">
            <img src="/logo.png" className="aspect-auto w-[150px]"/>
        </Link>
    );
    
    const getNavContent = () => {
        if(session){
            return (
                <>
                    <Link href="/dashboard">Oma Sivu</Link>
                    <Link href="/logout">Kirjaudu Ulos</Link>
                </>
            );
        }
        else{
            return (
                <>
                    <Link href="/register">Rekisteröidy</Link>
                    <Link href="/login">
                        <Button variant="primary">
                            <span className="mx-8 text-secondary">Kirjaudu Sisään</span>
                        </Button>
                    </Link>
                </>
            );
        }
    }

    return (
        <header className="absolute top-0 left-0 flex flex-row justify-between items-center w-full px-32 z-50 py-4">
            <Logo/>
            <nav className="flex flex-row gap-8 text-white font-semibold items-center">
                {getNavContent()}
            </nav>
        </header>
    )
}