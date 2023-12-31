import { Heading } from "kotilogi-app/components/Heading/Heading";
import { CSSProperties } from "react"

type SectionProps = React.PropsWithChildren & {
    title: string
}
export function Section(props: SectionProps){
    const sectionStyle: CSSProperties = {
        display: 'flex',
        gap: '0.25rem',
        flexFlow: 'column',
    }

    return (
        <div style={sectionStyle}>
            <Heading style={{margin: 0}}>{props.title}</Heading>
            {props.children}
        </div>
    );
}