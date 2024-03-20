'use client';

import Button from "@/components/Button/Button";
import { useState } from "react";

const Label = ({children}: React.ComponentProps<'label'>) => {
    return <label>{children}</label>
}

const Group = ({children}: React.PropsWithChildren) => {
    return (
        <div className="flex flex-col gap-1">
            {children}
        </div>
    );
}

const Input = ({children, ...props}: React.ComponentProps<'input'>) => {
    return (
        <input {...props}/>
    );
}

const Description = ({children}: React.PropsWithChildren) => {
    return (
        <div className="text-sm text-slate-500 w-full text-right">{children}</div>
    );
}

export function TransferForm(){

    const [key, setKey] = useState<string | null>(null);

    const generateKey = async () => {
        
    }

    return (
        <form className="flex flex-col gap-4">
            <Group>
                <Label>Vastaanottaja</Label>
                <Input type="email" name="receiver" placeholder="Kirjoita vastaanottajan sähköpostiosoite..."/>
                <Description>Osoitteen tulee olla Kotidokiin rekisteröidyn käyttäjän sähköpostiosoite.</Description>
            </Group>

            <Group>
                <Label>Salasana</Label>
                <Input type="password" name="password" placeholder="Kirjoita salasanasi..." autoComplete="new-password"/>
            </Group>

            <div className="flex justify-between">
                <Label>Ymmärrän, että siirto on pysyvä:</Label>
                <input type="checkbox" className="aspect-square w-5"/>
            </div>

            <div className="mt-8">
                <Button variant="primary" type="button">Luo Varmenne</Button>
            </div>
        </form>
    );
}