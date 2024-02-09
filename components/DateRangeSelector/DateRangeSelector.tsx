'use client';

type DateRangeSelectorProps = {
    data: {time: string}[],
}

export function DateRangeSelector(props: DateRangeSelectorProps){
    return (
        <div className="p-2 min-w-[500px] bg-white border rounded-md border-slate-300">
            <div className="w-full border-b border-slate-300">Valitse Aikaväli</div>
            <div className="h-[300px]">
                Sisältö HÄHÄÄ
            </div>
        </div>
    )
}