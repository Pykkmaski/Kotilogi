import { Prices } from "kotilogi-app/constants";
import { UserPlanType } from "kotilogi-app/types/UserType";

export function getFullPrice(plan: UserPlanType){
    return Prices[plan] * (1 + Prices.TAX) / 100;
}