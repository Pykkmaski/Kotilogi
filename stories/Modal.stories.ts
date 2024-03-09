import Modal from "@/components/Modals/Modal";

export default {
    title: 'Kotidok/Modal',
    component: Modal,
}

export const visible = {
    args: {
        show: true,
        onHide: () => {},
        id: 'test-modal-visible',
    }
}