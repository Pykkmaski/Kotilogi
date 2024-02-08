import { Prices } from "kotilogi-app/constants";

export function getFullPrice(plan: 'REGULAR' | 'PRO'){
    return Prices[plan] * (1 + Prices.TAX) / 100;
}