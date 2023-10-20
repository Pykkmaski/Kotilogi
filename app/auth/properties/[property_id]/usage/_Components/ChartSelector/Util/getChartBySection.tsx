import ElectricalUsageChart from "../../Chart/ElectricalUsageChart";
import HeatingUsageChart from "../../Chart/HeatingUsageChart";
import WaterUsageChart from "../../Chart/WaterUsageChart";
import { Sections } from "../Types/Sections";
import getUsageDataByCategory from "./getUsageDataByCategory";

export default function getChartBySection(section: Sections, data: any[]): JSX.Element | null{

    if(section === 'heat'){
        return <HeatingUsageChart data={data}/>
    }
    else if(section === 'electric'){
        return <ElectricalUsageChart data={data}/>
    }
    else if(section === 'water'){
        return <WaterUsageChart data={data}/>
    }
    else{
        return <span>Invalid Section Type: {section} Cannot draw chart.</span>;
    }
}