import { PropsWithChildren } from "react";

export function Padding({children}: PropsWithChildren){
    return <div className="sm:px-2 lg:px-32">{children}</div>
}