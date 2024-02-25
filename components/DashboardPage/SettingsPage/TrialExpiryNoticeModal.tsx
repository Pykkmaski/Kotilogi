import Button from "@/components/Button/Button";
import Modal, { ModalProps } from "@/components/Modals/Modal";
import { serviceName } from "kotilogi-app/constants";
import Link from "next/link";

export function TrialExpiryNoticeModal(props: ModalProps){
    return (
        <Modal {...props}>
            <Modal.Header>Kokeilujaksosi on päättynyt!</Modal.Header>
            <div className="flex flex-col gap-4">
                <p className="text-slate-500">
                    {serviceName} kokeilujaksosi on nyt päättynyt.
                </p>

                <Link href="">
                    <Button variant="primary">
                        <span className="font-semibold mx-4">
                            Siirry Tilaamaan
                        </span>
                    </Button>
                </Link>
            </div>
            
        </Modal>
    )
}