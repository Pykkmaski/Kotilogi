"use client";

import { useNavSelectorContext } from "kotilogi-app/components/NavSelector/NavSelectorContext";
import Link from "next/link"
import { usePathname } from "next/navigation";

type Props = {
    text: string,
    href: string,
}

export default function SelectorLink(props: Props){
    const {setSelectedPage} = useNavSelectorContext();
    const pathname = usePathname();

    if(props.href === pathname.split('/').at(-1)) setSelectedPage(props.text);

    return (
        <Link href={props.href} onClick={setSelectedPage(props.text)}>{props.text}</Link>
    )
}