export function ErrorText({children}){
    return <span className="text-red-600">{children}</span>
}

export function SuccessText({children}){
    return <span className="text-green-400">{children}</span>
}

export function SublabelText({children}){
    return <span className="text-sm">{children}</span>
}