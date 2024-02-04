import { Group } from "kotilogi-app/components/Group/Group"
import { Select } from "kotilogi-app/components/Input/Input"
import { SingleSelectForm } from "kotilogi-app/components/SingleInputForm/SingleInputForm";

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