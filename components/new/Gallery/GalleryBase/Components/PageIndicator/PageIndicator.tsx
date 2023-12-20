import { useRef } from "react";
import useGalleryContext from "../../GalleryContext";
import style from './style.module.scss';
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function PageIndicator(){
    const {state, dispatch} = useGalleryContext();
    const router = useRouter();

    const setPageNumber = async (e) => {
        const url = new URL(window.location.href);
        url.searchParams.set('page', e.target.value);
        router.push(url.href,);
    }

    return (
        <div className={style.pageIndicator}>
            <span>Sivu: </span>
            <input min="0" className={style.number} type="number" defaultValue={state.currentPage} onChange={setPageNumber}/>
        </div>
    )
}