/**Renders the children with a pre-determined style required by the design of the page. */
export function Layout({children}: React.PropsWithChildren){
    return (
        <div className="flex flex-col flex-1 relative mt-8 h-full">
            {children}
        </div>
    );
}

export function LayoutNavBarContainer({children}){
    return (
        <div className="xs:hidden md:block flex-1 flex flex-col pl-32 bg-gray-200 pt-8 pr-4">
            {children}
        </div>
    );
}

export function LayoutContentContainer({children}){
    return (
        <div className="flex-[9] xs:ml-0 md:ml-2 mb-8 pr-32 pt-8">
            {children}
        </div>
    );
}