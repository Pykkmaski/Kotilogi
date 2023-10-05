import ElectricalUsageChart from "../../Chart/ElectricalUsageChart";
import HeatingUsageChart from "../../Chart/HeatingUsageChart";
import WaterUsageChart from "../../Chart/WaterUsageChart";
import { Sections } from "../Types/Sections";
import getUsageDataByCategory from "./getUsageDataByCategory";

export default function getChartBySection(section: Sections, data: any[]): JSX.Element | null{
    const filteredData = getUsageDataByCategory(section, data);
    if(section === 'heat'){
        return <HeatingUsageChart data={filteredData}/>
    }
    else if(section === 'electric'){
        return <ElectricalUsageChart data={filteredData}/>
    }
    else if(section === 'water'){
        return <WaterUsageChart data={filteredData}/>
    }
    else{
        return <span>Invalid Section Type: {section} Cannot draw chart.</span>;
    }
}