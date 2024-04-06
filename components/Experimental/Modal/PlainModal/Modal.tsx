function Backdrop({children, ...props}: React.ComponentProps<'div'>){
    return (
        <div {...props} className="fixed top-0 left-0 bg-[#0005] w-screen h-screen backdrop-blur-sm z-20">
            {children}
        </div>
    );
}

function ModalContainer({children, ...props}: React.ComponentProps<'div'>){
    return (
        <div className="flex items-center justify-center w-full h-full relative z-30">
            {children}
        </div>
    );
}

function Header({children}){
    return (
        <div className="flex justify-between p-2 border-b border-slate-200">
            {children}
        </div>
    );
}

function Footer({children}){
    return (
        <div className="flex justify-end gap-4 items-center p-2 border-t border-slate-200">
            {children}
        </div>
    )
}

export function Modal({children, ...props}: React.ComponentProps<'div'>){
    return (
        <Backdrop {...props}>
            <ModalContainer>
                {children}
            </ModalContainer>
        </Backdrop>
    );
}

Modal.Header = Header;
Modal.Footer = Footer;