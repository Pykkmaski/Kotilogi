import { useContext } from "react";
import { CardItemContext } from "./CardItem";

export function useCardItemContext(){
    const context = useContext(CardItemContext);
    if(!context) throw new Error('useCardItemContext must be used within the scope of a CardItemContext!');
    return context;
}