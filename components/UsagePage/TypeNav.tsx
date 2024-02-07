import Link from "next/link";
import { Group } from "../Group";
import { useSearchParams } from "next/navigation";
import React from "react";

export function TypeNav({children}){
    const searchParams = useSearchParams();
    const currentParam = searchParams.get('type');

    return (
        <nav>
            <div className="flex flex-row gap-1 items-center">
                {
                    React.Children.map(children, (child: React.ReactElement<HTMLAnchorElement>) => {
                        const params = new URLSearchParams(child.props.href);
                        const typeName = params.get('type');
                        const baseClassName = "p-1 flex justify-center items-center rounded-full min-w-[70px] text-black text-sm";

                        if(params.get('type') === currentParam){
                            const selectedClassName = [
                                'font-semibold shadow-md',
                                typeName === 'heat' ? 'bg-red-500 text-white' : typeName === 'water' ? 'bg-blue-500 text-white' : 'bg-blue-200 text-black',
                                baseClassName,

                            ];

                            return (
                                <div className={selectedClassName.join(' ')}>
                                    {child}
                                </div>
                            )
                        }
                        else{
                            return <div className={baseClassName}>{child}</div>
                        }
                    })
                }
            </div>
        </nav>
    );
}