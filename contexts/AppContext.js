
import { createContext, useContext } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

const AppContext = createContext();

export default function AppWrapper(props){
    const contextValues = {
        token : 'testToken',
        user : {
            username: 'testUser',
            email: 'testUser@app.com',
            active: 1,
        }
    }

    return (
        <AppContext.Provider value={contextValues}>
            {props.children}
        </AppContext.Provider>
    );
}

export function useAppContext(){
    return useContext(AppContext);
}