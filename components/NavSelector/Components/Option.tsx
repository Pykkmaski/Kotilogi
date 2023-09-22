"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

type Props = {
    children: React.ReactNode,
    href: string,
}

export default function NavOption(props: Props){
    const pathname = usePathname();
    const router = useRouter();
    const section = pathname.split('/').at(-1);

    return (
        <option selected={props.href === section} onClick={() => router.replace(props.href)}>{props.children}</option>
    );
}