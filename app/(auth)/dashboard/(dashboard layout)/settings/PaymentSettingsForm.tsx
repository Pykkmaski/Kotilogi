import { Group } from "kotilogi-app/components/Group/Group"
import { Input, Select } from "kotilogi-app/components/Input/Input"
import { ContentCard } from "kotilogi-app/components/RoundedBox/RoundedBox"
import { SingleInputForm, SingleSelectForm } from "kotilogi-app/components/SingleInputForm/SingleInputForm";

type PaymentSettingsFormProps = {

}

export function PaymentSettingsForm(props: PaymentSettingsFormProps){
    return (
        <Group direction="col" gap={4}>
            <SingleSelectForm
                inputComponent={Select}
                childComponent={Select.Option}
                submitMethod={(value: object) => Promise.resolve({})}
                initialInputProps={{
                    name: "plan",
                    label: 'Tilaus',
                    description: 'Valitse tilauksesi.',
                    defaultValue: 'regular'
                }}
                childProps={[
                    {
                        value: 'regular',
                        children: 'Perus'
                    },

                    {
                        value: 'pro',
                        children: 'Pro',
                    }
                ]}

                />
            
                
        </Group>
    );
}