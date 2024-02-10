import { PropsWithChildren } from "react";

export function Padding({children}: PropsWithChildren){
    return <div className="sm:px-2 md:px-32">{children}</div>
}