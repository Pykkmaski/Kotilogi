function randomRange(min: number, max: number): number{
    return (Math.random() * (max - min)) + min;
}

export default function generateDummyData(initialValue: number, volatility: number, length: number): number[]{
    const dummyData: number[] = [];
    var previousValue: number = initialValue;

    for(let i = 0; i < length; ++i){
        const range = previousValue * volatility;
        previousValue = Math.round((previousValue + randomRange(-range, range)) * 1000) / 1000;
        dummyData.push(
            previousValue,
        )
    }
    return dummyData;
}