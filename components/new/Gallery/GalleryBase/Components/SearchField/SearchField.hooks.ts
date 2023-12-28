import { useEffect, useRef, useState } from "react";
import { useGalleryContext } from "../../Gallery";

export function useSearchField(){
    const {dispatch, state} = useGalleryContext();
    const [what, setWhat] = useState('')
    const [column, setColumn] = useState('title');
    const [search, setSearch] = useState<{
        what: string,
        column: string,
    }>({
        what, column
    });

    const timeout = useRef<NodeJS.Timeout | null>(null);
    
    useEffect(() => {
        const duration = 500;

        timeout.current = setTimeout(() => {
            dispatch({
                type: 'set_search',
                value: search,
            })
    
        }, duration);

        return () => {
            if(!timeout.current) return;
            clearTimeout(timeout.current);
        }
    }, [search]);

    useEffect(() => {
        setSearch({
            what, column
        });
    }, [what, column]);

    return {
        setWhat, setColumn, data: state.data
    }
}