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
            <h2>{props.title}</h2>
            {props.children}
        </div>
    );
}