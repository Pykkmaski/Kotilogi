import { useRouter } from "next/navigation";
import { useResetFormProvider } from "./ResetFormContext";
import { ContentCard } from "@/components/RoundedBox/RoundedBox";
import { Group } from "@/components/Group";
import { Input } from "@/components/Input/Input";
import { PrimaryButton } from "@/components/Button/PrimaryButton";
import { SecondaryButton } from "@/components/Button/SecondaryButton";
import { ErrorText } from "@/components/Util/Text";
import { useResetStepOne } from "./useResetStepOne";

export function StepOne(){
    const router = useRouter();
    const {data, status, updateData, resetStepOneHandler} = useResetStepOne();

    const isDisabled = () => status === 'loading' || status === 'success';

    return (
        <ContentCard title={"Nollaa salasanasi"}>
            <p>
                Anna sähköpostiosoitteesi. Lähetämme antamaasi osoitteeseen linkin,<br/> jonka kautta pääset nollaamaan salasanasi.<br/>
                Sähköpostin saapumiseen saattaa mennä muutama minuutti.
            </p>

            <form onSubmit={resetStepOneHandler}>
                <div className="flex flex-col gap-2">
                    <Input 
                        type="email" 
                        name="email"
                        label="Sähköpostiosoite"
                        description="Anna sähköpostiosoitteesi." 
                        placeholder="Kirjoita sähköpostiosoitteesi..."
                        required
                        onChange={updateData}/>

                    {
                        status === 'invalid_email' ? (
                            <div className="flex w-full">
                                <ErrorText>Antamallesi sähköpostiosoitteelle ei löytynyt rekisteröityä käyttäjää!</ErrorText>
                            </div>
                        )
                        :
                        null
                    }
                </div>

                <div className="mt-4">
                    <Group direction="row" justify="end" gap={2}>
                        <SecondaryButton 
                            type="button"
                            onClick={() => router.push('/login')}
                            disabled={status === 'loading' || isDisabled()}
                        >Peruuta</SecondaryButton>

                        <PrimaryButton 
                            type="submit" 
                            disabled={!data.email || isDisabled()}
                            loading={status === 'loading'}
                        >Lähetä</PrimaryButton>
                    </Group>
                </div>
            </form>
        </ContentCard>
        
    );
}