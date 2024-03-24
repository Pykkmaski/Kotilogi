import { IndexHeader } from "@/components/App/IndexHeader";

export default function TransparentHeaderLayout({children}: React.PropsWithChildren){
    return (
        <>
            <IndexHeader/>
            {children}
        </>
    )
}