import { CartItem } from "./CartItem";

export function CurrentCartItems({items}){
    return (
        <div className="flex flex-col gap-2 flex-1">
            <h2 className="text-xl text-slate-500 font-semibold mb-4">Nykyiset talot</h2>
            {
                items?.map(item => <CartItem item={item}/>)
            }
        </div>
    );
}