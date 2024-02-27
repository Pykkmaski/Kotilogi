import Link from 'next/link';

export default function NotFound(){
    return (
        <div className="flex flex-col justify-center items-center flex-1 text-middle">
            <h1 className="text-slate-500">Tätä sivua ei vielä ole.</h1>
            <p className="text-slate-500 mt-8">
                <Link href="/">Palaa Etusivulle</Link>
            </p>
        </div>
    )
}