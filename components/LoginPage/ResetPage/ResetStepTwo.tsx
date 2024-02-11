import { PrimaryButton } from "@/components/Button/PrimaryButton";
import { SecondaryButton } from "@/components/Button/SecondaryButton";
import { Group } from "@/components/Group";
import { Input } from "@/components/Input/Input";
import { useInputData } from "@/components/Modals/BaseAddModal.hooks";
import { ContentCard } from "@/components/RoundedBox/RoundedBox";
import { resetPassword } from "kotilogi-app/actions/resetPassword";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { useResetFormProvider } from "./ResetFormContext";
import { emailKey } from "./resetFormReducer";

export function StepTwo(){
    const router = useRouter();
    const params = useSearchParams();

    const [isLoading, setIsLoading] = useState(false);
    const {previous} = useResetFormProvider();
    const {data, updateData} = useInputData({});

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        const password1: string = e.target.password1.value;
        const password2: string = e.target.password2.value;
        const verificationCode = params.get('token');

        if(!verificationCode){
            toast.error('Salasanan nollaustodennus puuttuu!');
        }
        else if(password1 !== password2) {
            toast.error('Salasanat eivät täsmää!');
        }
        else{
            resetPassword(verificationCode, password1)
            .then(() => {
                toast.success('Salasana vaihdettu onnistuneesti!');
                sessionStorage.removeItem(emailKey);
                router.push('/login');
            })
            .catch(err => {
                toast.error(err.message);
            })
        }

        setIsLoading(false);
    }

    return (
        <ContentCard title="Luo Uusi Salasana">
            <p>
                Luo uusi salasana tällä lomakkeella. <br/>
                Salasana tulee vaihtaa 30 minuutin sisällä.
            </p>

            <form onSubmit={onSubmitHandler} className="w-full mt-4 flex flex-col gap-4">
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
                        <SecondaryButton onClick={previous} disabled={isLoading}>Takaisin</SecondaryButton>
                        <PrimaryButton type="submit" disabled={isLoading || !data.password1 || !data.password2} loading={isLoading}>Lähetä</PrimaryButton>
                    </Group>
                </div>
            </form>
        </ContentCard>
        
    );
}