import Button from "@/components/Button/Button";

export function DeleteButton(props: React.ComponentProps<'button'>){
    return (
        <Button variant="secondary" {...props}>
            <div className="flex gap-2 border-slate-500 items-center">
                <i className="fa fa-trash text-slate-500 text-2xl"/>
                <span>Poista</span>
            </div>
        </Button>
    );
}

export function AddButton(props: React.ComponentProps<'button'>){
    return (
        <Button variant="primary-dashboard" {...props}>
            <i className="fa fa-plus text-white text-2xl m-2"/>
        </Button>
    );
}

export function DeactivateButton(props: React.ComponentProps<'button'>){
    return (
        <Button variant="secondary" {...props} title="Poista valitut kohteet käytöstä...">
            <div className="flex gap-2 border-slate-500 items-center">
                <i className="fa fa-ban text-slate-500 text-2xl"/>
                <span>Poista käytöstä</span>
            </div>
        </Button>
    )
}