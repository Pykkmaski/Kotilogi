/**Renders the children with a pre-determined style required by the design of the page. */
export function Layout({children}: React.PropsWithChildren){
    return (
        <div className="flex flex-col flex-1 relative mt-8 h-full">
            {children}
        </div>
    );
}