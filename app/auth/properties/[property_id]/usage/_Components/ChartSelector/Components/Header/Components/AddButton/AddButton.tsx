import Button from "kotilogi-app/components/Button/Button";
import { useChartSelectorContext } from "../../../../ChartSelectorContext";
import PlusIcon from 'kotilogi-app/assets/plus.png';
import AddModal from "./Components/AddModal/AddModal";

export default function AddButton(){

    const {dispatch} = useChartSelectorContext();

    return (
        <>
            <AddModal/>
            <Button 
                className="primary" 
                onClick={() => dispatch({
                    type: 'toggle_add_modal', 
                    value: true
                })}
                mobileIconSrc={PlusIcon}
                desktopText="Lisää Uusi Tieto"
            />
        </> 
    )
}