export function TotalPrice({data}){

    const totalPrice = data.map(d => d.price).reduce((acc, cur) => acc + cur, 0);
    
    return (
        <div className="text-slate-500 flex flex-col">
            <span className="text-sm xs:text-center lg:text-start">Kaikki kulut yhteensä:</span>
            <h1 className="text-4xl xs:text-center lg:text-start">{totalPrice.toFixed(2)}€</h1>
        </div>
    );
}