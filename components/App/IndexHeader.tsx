import { options } from "kotilogi-app/app/api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import Link from "next/link"
import Button from "../Button/Button";
import { MobileMenu } from "./MobileMenu/MobileMenu";
import { CallbackOnClickProvider } from "../Util/CallbackOnClickProvider";

export async function IndexHeader(){
    const session = await getServerSession(options as any) as any;

    const Logo = () => (
        <Link href="/">
            <img src="/logo.png" className="aspect-auto md:w-[150px] xs:w-[50px]"/>
        </Link>
    );
    
    const getNavContent = () => {
        if(session){
            return (
                <>
                    <div className="md:flex xs:hidden gap-8 items-center">
                        <Link href="/dashboard/properties">Oma Sivu</Link>
                        <Link href="/logout">Kirjaudu Ulos</Link>
                    </div>

                    <div className="md:hidden xs:block">
                        <MobileMenu>
                            <Link href="/">Etusivulle</Link>
                        </MobileMenu>
                    </div>
                </>
            );
        }
        else{
            return (
                <>
                    <div className="xs:hidden md:flex flex-row gap-8 items-center">
                        <Link href="/about">Tietoa meistä</Link>
                        <div className="w-[1px] bg-white h-4"/>
                        <Link href="/register">Rekisteröidy</Link>
                        <Link href="/login">
                            <Button variant="primary">
                                <span className="mx-8 text-secondary">Kirjaudu Sisään</span>
                            </Button>
                        </Link>
                    </div>

                    <div className="xs:block md:hidden text-slate-500">
                        <MobileMenu>
                            <nav className="flex flex-col gap-8 text-4xl">
                                <Link href="/">Etusivulle</Link>
                                <Link href="/about">Tietoa Meistä</Link>
                                <Link href="/register">Rekisteröidy</Link>
                                <Link href="/login">Kirjaudu Sisään</Link>
                            </nav>
                        </MobileMenu>
                    </div>
                </>
            );
        }
    }

    return (
        <header className="absolute top-0 left-0 flex flex-row justify-between items-center w-full xs:px-4 md:px-32 z-50 py-4">
            <Logo/>
            <nav className="flex flex-row gap-8 text-white font-semibold items-center">
                {getNavContent()}
            </nav>
        </header>
    )
}