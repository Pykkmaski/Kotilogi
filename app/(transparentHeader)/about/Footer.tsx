import Link from "next/link";

export function Footer(){
    return (
        <footer className="flex flex-col gap-4 md:justify-between xs:justify-center bg-primary md:px-32 xs:px-4 pt-10 pb-32 w-full">
            <h2 className="text-4xl font-semibold text-black w-full xs:text-center md:text-left">Kotidok Oy</h2>
            <div className="flex flex-col gap-4 w-full md:items-start xs:items-center">
                <Link href="/">Etusivulle</Link>
            </div>
        </footer>
    );
}