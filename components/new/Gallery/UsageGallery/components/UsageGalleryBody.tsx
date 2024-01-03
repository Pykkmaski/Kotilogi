import { SplitScreen } from "kotilogi-app/components/SplitScreen/SplitScreen";
import React from "react";

/**This component is responsible for displaying the chart and the list of the usage data of the main gallery. Accepts the chart and body as children. */
export function UsageGalleryBody({children}){
    const [chart, data] = React.Children.toArray(children);
    
    return (
        <SplitScreen>
            {chart}
            {data}
        </SplitScreen>
    );
}