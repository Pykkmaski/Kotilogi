import { createContext, useContext } from "react";
import { useItemGalleryContext } from "./GalleryProvider";

const PropertyGalleryContext = createContext();

export default function PropertyGalleryProvider({children}){
    const itemGalleryContext = useItemGalleryContext();
    const updateProperty = (id, updated) => {
        
    }

    const contextValue = {
        ...itemGalleryContext,
        updateProperty,
    }

    return (
        <PropertyGalleryContext.Provider value={contextValue}>
            {children}
        </PropertyGalleryContext.Provider>
    );
}

export function usePropertyGalleryContext(){
    return useContext(PropertyGalleryContext);
}