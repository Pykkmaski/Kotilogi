import { AddPropertyModal } from "@/components/Modals/AddModal";

export default {
    title: 'Kotidok/PropertyAddModal',
    component: AddPropertyModal,
}

export const visible = {
    args: {
        show: true,
        onHide: () => {},
        id: 'property-add-modal-visible',
    }
}