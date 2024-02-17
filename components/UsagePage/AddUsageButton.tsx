import { PrimaryButton } from "../Button/PrimaryButton";

export function AddUsageButton(){
    return (
        <PrimaryButton title="Lisää kulutustieto">
            <img src="/icons/plus.png" className="invert" width="25px" height="25px"/>
        </PrimaryButton>
    );
}