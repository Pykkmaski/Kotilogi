import { PropsWithChildren } from "react";

export function Padding({children}: PropsWithChildren){
    return <div className="xs:px-2 md:px-32">{children}</div>
}