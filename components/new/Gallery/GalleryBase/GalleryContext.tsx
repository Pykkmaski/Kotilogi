import { useContext, createContext } from "react";

export const GalleryContext = createContext<GalleryBase.ContextValue | null>(null);

export default function useGalleryContext(){
    const context = useContext(GalleryContext);
    if(!context) throw new Error('Gallery context is null!');
    return context;
}