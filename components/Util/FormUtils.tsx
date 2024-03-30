export const Label = ({children}: React.ComponentProps<'label'>) => {
    return <label>{children}</label>
}

export const Group = ({children}: React.PropsWithChildren) => {
    return (
        <div className="flex flex-col gap-1">
            {children}
        </div>
    );
}

export const Input = ({children, ...props}: React.ComponentProps<'input'> & React.PropsWithChildren) => {
    return (
        <div className="relative flex w-full items-center">
            <input {...props} className="w-full"/>
            <div className="absolute right-2">
                {children}
            </div>
        </div>
    );
}

export const SubLabel = ({children}: React.PropsWithChildren) => {
    return (
        <div className="text-sm w-full text-right">{children}</div>
    );
}

export const Description = ({children}: React.PropsWithChildren) => {
    return (
        <SubLabel>
            <div className="text-slate-500">{children}</div>
        </SubLabel>
    );
}

export const ErrorMessage = ({children}: React.PropsWithChildren) => {
    return (
        <SubLabel>
            <div className="text-red-500">{children}</div>
        </SubLabel>
    );
}