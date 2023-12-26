import { CSSProperties } from "react"
import { SearchField } from "../SearchField/SearchField"

export function SearchFilter(){
    const searchFilterStyle: CSSProperties = {
        display: 'flex',
        flexFlow: 'column',
        minWidth: '100px',
        borderRadius: '10px',
        border: '1px solid #DDD',
        padding: 'var(--small-gap)',
    }

    return (
        <div style={searchFilterStyle}>
            <SearchField/>
        </div>
    );
}