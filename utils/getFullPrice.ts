import { Prices } from "kotilogi-app/constants";
import { UserPlanType } from "kotilogi-app/types/UserType";
import { formatNumber } from "./formatNumber";

export function getBasePrice(plan: UserPlanType){
    return formatNumber(Prices[plan] / 100);
}

export function getFullPrice(plan: UserPlanType){
    return formatNumber(Math.round((Prices[plan] * (1 + Prices.TAX) / 100) * 100) / 100);
}