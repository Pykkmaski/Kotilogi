export default function RoofTypeSelector(){
    return (
        <select name="buildingType" onChange={updateData}>
            {
                ([
                    'Kerrostalo',
                    'Omakotitalo',
                    'Rivitalo',
                    'Luhtitalo',
                    'Erillistalo',
                    'Paritalo',
                    'Puutalo-osake',
                    'Muu'
                ])
                .map((item, index: number) => {
                    return (
                        <option value={item} key={'property-type-option-' + index} selected={currentData?.buildingType === item}>{item}</option>
                    )
                })
            }
        </select>
    )
}