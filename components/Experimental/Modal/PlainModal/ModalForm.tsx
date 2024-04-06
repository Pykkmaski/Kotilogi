import { VisibilityProvider } from "@/components/Util/VisibilityProvider/VisibilityProvider";
import { Modal } from "./Modal";
import { CloseButton } from "@/components/CloseButton";
import Button from "@/components/Button/Button";

type ModalFormProps = {
    title: string;
}

export function ModalForm({children, hidden, title, ...props}: React.ComponentProps<'form'>){
    return (
        <Modal hidden={hidden}>
            <div className="flex flex-col bg-white rounded-lg">
                <div className="flex justify-between items-center p-2 border-b border-slate-500">
                    <h1 className="text-lg text-slate-500">{title}</h1>
                    <VisibilityProvider.Trigger>
                        <CloseButton/>
                    </VisibilityProvider.Trigger>
                </div>

                <form {...props} className="flex flex-col p-2">
                    {children}
                </form>

                <div className="flex items-center justify-between p-2 border-t border-slate-500">
                    <VisibilityProvider.Trigger>
                        <Button variant="secondary">Sulje</Button>
                    </VisibilityProvider.Trigger>
                    <Button variant="primary-dashboard">
                        <span className="mx-8">Lähetä</span>
                    </Button>
                </div>
            </div>
        </Modal>
    );
}