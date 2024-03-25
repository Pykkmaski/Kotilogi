import React from "react";
import { ReactElement } from "react";

type CallbackOnClickProviderProps<CallbackT extends Function> = React.PropsWithChildren & {
    callback: CallbackT;

}

export function CallbackOnClickProvider<CallbackT extends Function>({children, callback}: CallbackOnClickProviderProps<CallbackT>){
    return React.Children.map(children, (child: ReactElement) => React.cloneElement(child, {
        ...child.props,
        onClick: callback
    }));
}