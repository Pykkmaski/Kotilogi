import { UsagePieChart } from "./PieChart";

export function Overview({data}){

    const totalPrice = data.reduce((acc: number, cur) => acc += cur.price, 0);

    return (
        <div className="flex gap-4">
            <div className="w-[500px]">
                <UsagePieChart data={data}/>
            </div>

            <div className="text-slate-500 flex flex-col">
                <span className="text-sm">Kuluihin käytetty yhteensä:</span>
                <h1 className="text-4xl">{totalPrice.toFixed(2)}€</h1>
            </div>
        </div>
    )
}