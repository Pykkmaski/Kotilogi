import { useInputData } from "@/components/Modals/BaseAddModal.hooks";
import { updatePassword } from "kotilogi-app/actions/user/updatePassword";
import { MutableRefObject, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import * as users from '@/actions/users';
import { useDashboardContext } from "../DashboardContextProvider";
import { updateUserPassword } from "kotilogi-app/actions/experimental/users";

type PasswordSettingStatus = 'idle' | 'invalid_password' | 'password_mismatch' | 'loading' | 'success' | 'unexpected';

export function usePasswordSettingsForm(formRef: MutableRefObject<HTMLFormElement>){
    const router = useRouter();
    const [status, setStatus] = useState<PasswordSettingStatus>('idle');
    const {data, updateData, reset: resetData} = useInputData({});
    const {user} = useDashboardContext();

    const resetForm = () => {
        formRef.current?.reset();
        resetData();
        setStatus('idle');
    }

    const resetPasswordHandler = (e) => {
        e.preventDefault();
        setStatus('loading');

        if(data.password1 !== data.password2){
            setStatus('password_mismatch');
        }
        else{
            updateUserPassword(user.email, data.password1, data.password3)
            .then(result => {
                setStatus(result as PasswordSettingStatus);

                if(result === 'success'){
                    toast.success('Salasana päivitetty!');
                    resetForm();
                    router.refresh();
                }
            })
            .catch(err => {
                setStatus('unexpected');
            });
        }
    }
    return {
        status,
        data,
        updateData,
        resetPasswordHandler,
        resetForm,
    }
}