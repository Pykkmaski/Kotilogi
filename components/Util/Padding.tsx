import { PropsWithChildren } from "react";

export function Padding({children}: PropsWithChildren){
    return <div className="pl-32 pr-32">{children}</div>
}