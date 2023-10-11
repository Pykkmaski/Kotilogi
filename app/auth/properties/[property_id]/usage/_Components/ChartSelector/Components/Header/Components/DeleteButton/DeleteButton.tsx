import Button from "kotilogi-app/components/Button/Button";
import { useChartSelectorContext } from "../../../../ChartSelectorContext";
import BinIcon from 'kotilogi-app/assets/bin.png';
import DeleteModal from "./Components/DeleteModal/DeleteModal";

export default function DeleteButton(){

    const {state, dispatch} = useChartSelectorContext();

    return (
        <>
            <DeleteModal/>
            <Button 
                className="secondary"
                mobileIconSrc={BinIcon}
                desktopText='Poista'
                onClick={() => dispatch({
                    type: 'toggle_delete_modal',
                    value: true,
                })}
                disabled={!state.selectedItems.length }
            />
        </>
        
    )
}