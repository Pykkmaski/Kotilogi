//Merges the passed usage data into an array of 12 items corresponding to each month of the year.
export function mergeByMonth(data: Kotilogi.UsageType[], accumulate: boolean = false){
    const merged: number[] = [];

    const getDataForMonth = (month: number, data: Kotilogi.UsageType[]) => data.filter(d => {
        const dataMonth = new Date(d.time).getMonth();
        return dataMonth === month;
    });

    for(var month = 0; month < 12; ++month){
        const dataOnMonth = getDataForMonth(month, data);
        const priceOnMonth = dataOnMonth.reduce((acc, cur) => acc + cur.price, 0);
        const previousPrice = month > 0 ? merged[month - 1] : 0;

        const priceToSave = accumulate ? previousPrice + priceOnMonth : priceOnMonth;
        merged.push(priceToSave);
    }

    return merged;
}

/**
 * Returns an array of 12 elements. Each element is an array of usage data corresponding to the month represented by the parent array index (0: January - 12: December)
 * @param data 
 */
export function splitByMonth(data: Kotilogi.UsageType[]){
    const newData: Kotilogi.UsageType[][] = Array(12).fill([]);

    for(let month = 0; month < 12; ++month){
        const dataOnMonth = data.filter(d => new Date(d.time).getMonth() === month);
        newData[month] = dataOnMonth;
    }

    return newData;
}