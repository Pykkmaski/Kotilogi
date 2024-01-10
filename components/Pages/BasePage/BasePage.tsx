'use server';

export type BasePageProps = React.PropsWithChildren;

export async function BasePage({children}: BasePageProps){
    return (
        <main>
            {children}
        </main>
    );
}