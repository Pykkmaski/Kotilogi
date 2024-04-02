'use client';

const Line = () => <div className="bg-white h-1 w-full"/>

type LineButtonProps = React.ComponentProps<'div'> & {
    open?: boolean;
}

export function LineButton({open, ...props}: LineButtonProps){

    const generateLines = (numLines: number) => {
        const lines: JSX.Element[] = [];
        for(let i = 0; i < numLines; ++i){
            lines.push(<Line/>);
        }
        return lines;
    }

    return (
        <div className="flex flex-col gap-2 w-8" {...props}>
            {generateLines(3)}
        </div>
    );
}