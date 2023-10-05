
export default function getUsageDataByCategory(category: string, usage: Kotilogi.UsageType[]): Kotilogi.UsageType[]{
    return usage.filter((data: Kotilogi.UsageType) => data.type === category);
}