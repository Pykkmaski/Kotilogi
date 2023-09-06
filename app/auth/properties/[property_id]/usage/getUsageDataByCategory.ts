import { UsageType } from "kotilogi-app/types/UsageType";

export default function getUsageDataByCategory(category: string, usage: UsageType[]): UsageType[]{
    return usage.filter((data: UsageType) => data.type === category);
}