import { PrimaryButton } from "@/components/Button/PrimaryButton";
import { SecondaryButton } from "@/components/Button/SecondaryButton";
import { Group } from "@/components/Group";
import { Input } from "@/components/Input/Input";
import { ContentCard } from "@/components/RoundedBox/RoundedBox";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useResetStepTwo } from "./useResetStepTwo";

export function StepTwo(){
    const router = useRouter();
    const params = useSearchParams();
    const {data, status, resetStepTwoHandler, updateData} = useResetStepTwo();

    const loading = status === 'loading';

    return (
        <ContentCard title="Luo Uusi Salasana">
            <p>
                Luo uusi salasana tällä lomakkeella. <br/>
                Salasana tulee vaihtaa 30 minuutin sisällä.
            </p>

            <form onSubmit={resetStepTwoHandler} className="w-full mt-4 flex flex-col gap-4">
                <Input 
                    autoComplete="new-password"
                    type="password" 
                    name='password1' 
                    label="Anna Uusi Salasana"
                    description="Tilisi uusi salasana."
                    placeholder="Kirjoita uusi salsanasi..."
                    required 
                    minLength={8}
                    onChange={updateData}/>
           

                <div className="w-full">
                    <Group direction="row">
                        <Input 
                            label="Toista Salasana"
                            description="Uuden salsanan vahvistus."
                            placeholder="Kirjoita salasana uudelleen..."
                            type="password" 
                            name="password2" 
                            required 
                            minLength={8}
                            onChange={updateData}/>
                    </Group>
                </div>
        
                <div className="mt-4 w-full">
                    <Group direction="row" justify="end">
                        <Link href="/login/reset">
                            <SecondaryButton disabled={loading}>Takaisin</SecondaryButton>
                        </Link>
                        
                        <PrimaryButton type="submit" disabled={loading || !data.password1 || !data.password2} loading={loading}>Lähetä</PrimaryButton>
                    </Group>
                </div>
            </form>
        </ContentCard>
        
    );
}