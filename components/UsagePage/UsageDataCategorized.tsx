import { filterIntoObject } from "kotilogi-app/utils/filterIntoObject"

const Label = ({children}: React.PropsWithChildren) => (
    <div className="text-lg font-semibold">{children}</div>
);

const Item = ({children}: React.PropsWithChildren) => (
    <div className="flex gap-8 items-center justify-between">{children}</div>
)

const Total = ({data}: {data: Kotilogi.UsageType[]}) => {
    const total = data.map(d => d.price).reduce((acc, cur) => acc + cur, 0);
    return (
        <span>{total.toFixed(2)}€</span>
    );
}

type UsageDataCategorizedProps = {
    data: Kotilogi.UsageType[],
}

export function UsageDataCategorized({data}: UsageDataCategorizedProps){

    const dataFiltered = filterIntoObject(data, 'type', ['water', 'heat', 'electric']);

    return (
        <div className="flex flex-col gap-4 text-slate-500">
            {
                Object.keys(dataFiltered).map(key => {

                    const displayKey = key === 'heat' ? 'Lämmitys' : key === 'water' ? 'Vesi' : 'Sähkö';

                    return (
                        <Item>
                            <Label>{displayKey}:</Label>
                            <Total data={dataFiltered[key]}/>
                        </Item>
                    )
                })
            }
        </div>
    )
}