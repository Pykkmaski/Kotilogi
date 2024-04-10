import { TypeNav } from "@/components/UsagePage/TypeNav";
import { Controls } from "./page.components";
import Link from "next/link";

export function Header({timestamps, year, displayYear}){
    return(
        <div className="w-full flex bg-white justify-between gap-4">
            <div className="flex gap-4 items-center">
                <h1 className="text-lg text-slate-500 mr-4">Kulutustiedot</h1>
                <div className="xs:hidden lg:block">
                    <TypeNav>
                        <Link href={`?type=all&year=${year}`}>Kaikki</Link>
                        <Link href={`?type=heat&year=${year}`}>Lämmitys</Link>
                        <Link href={`?type=water&year=${year}`}>Vesi</Link>
                        <Link href={`?type=electric&year=${year}`}>Sähkö</Link>
                    </TypeNav>
                </div>
            </div>
            
            <Controls timestamps={timestamps} currentYear={displayYear}/>
        </div>
    )
    
}