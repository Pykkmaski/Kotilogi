import { PropertyColumns } from "kotilogi-app/constants";

export default function getInputElementByLabel(label: string, value: any, onChangeHandler: (e: any) => void): JSX.Element | null{
    const column = Object.values(PropertyColumns).find(item => {
        if(item.LABEL === label){
            return item;
        }
    });

    var element: JSX.Element | null = null;
    if(column){
        switch(column.TYPE){
            case 'text':
            case 'number':
                element = (
                    <input 
                        disabled={[
                            PropertyColumns.ADDRESS.LABEL, 
                            PropertyColumns.ZIP_CODE.LABEL
                        ].includes(column.LABEL)} 
                        type={column.TYPE} 
                        name={column.LABEL} 
                        onChange={onChangeHandler} 
                        defaultValue={value}
                    />
                )
            break;

            case 'textarea':
                element = <textarea name={column.LABEL} defaultValue={value} onChange={onChangeHandler}></textarea>
            break;

            case 'select': (
                element = <select name={column.LABEL}  onChange={onChangeHandler}>
                    {column.OPTIONS?.map((option, index: number) => {
                        return (
                            <option selected={value == option} value={option} key={`${column.LABEL}-option-${index}`}>{option}</option>
                        )
                    })}
                </select>
            )
            break;
        }
    }

    return element;
}