import { useContext } from "react";
import { ListItemContext } from "./ListItem";

export function useListItemContext(){
    const context = useContext(ListItemContext);
    if(!context) throw new Error('useListItemContext must be used within the scope of a ListItemContext!');
    return context;
}