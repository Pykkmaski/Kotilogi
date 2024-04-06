export function createVismaProductArray(bills: TODO){
    return bills.map(bill => {
        const price = Math.round(bill.amount * 1.24);
        const preTaxPrice = bill.amount;

        return {
            id: bill.id,
            title: bill.stamp,
            pretax_price: preTaxPrice,
            count: 1,
            tax: 24,
            price: price,
            type: 1,
        }
    })
}