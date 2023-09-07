import { UsageType } from "kotilogi-app/types/UsageType"
import { ChartDatapointType } from "./ChartDatapointType"

export type ChartProps = {
    data: UsageType[],
    type: ChartDatapointType,
}