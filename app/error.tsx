"use client";

export default function Error({error, reset}){
    return (
        <div className="flex flex-col flex-1 justify-center items-center text-slate-500">
            <h1 className="text-4xl">Hups! Kohtasimme virheen!</h1>
            <p>
                {error.message}
            </p>
            <h2 className="text-xl mt-8">Kokeile päivittää sivu.</h2>
            {reset}
        </div>
    )
}