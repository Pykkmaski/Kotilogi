import { Suspense, useEffect, useState } from "react";
import HoverOverlay from "../HoverOverlay/HoverOverlay";
import Spinner from "kotilogi-app/components/Spinner/Spinner";
import { useCardContext } from "../../CardContext";
import style from './style.module.scss';
import Menu from "../Menu/Menu";
import Button from "kotilogi-app/components/Button/Button";
import { useRouter } from "next/navigation";
import { AppRouterInstance, NavigateOptions } from "next/dist/shared/lib/app-router-context";
import useGalleryContext from "../../../GalleryBase/GalleryContext";
import { useGalleryWithDeleteContext } from "../../../GalleryWithDelete/GalleryWithDeleteProvider";
import { getCardDestination } from "../../../GalleryBase/Util/getCard";
import Link from "next/link";
import serverUpdateDataById from "kotilogi-app/actions/serverUpdateDataById";
import serverRevalidatePath from "kotilogi-app/actions/serverRevalidatePath";
import toast from "react-hot-toast";
import isMainImage from "kotilogi-app/utils/isMainImage";

type Props = {
    imageUrl: string,
    title: string,
}

type HOCProps = {
    showMenu: boolean,
    id: Kotilogi.IdType,
    router: AppRouterInstance,
}

function PropertiesMenu(props: HOCProps){
    return (
        <HoverOverlay visible={props.showMenu}>
            <Button
                className="primary"
                desktopText="Muokkaa"
                onClick={() => props.router.push(`/auth/properties/${props.id}/info`)}
            />
        </HoverOverlay>
    );
}

function ObjectsMenu(props: HOCProps){
    const {dispatch, dbTableName, refId} = useGalleryContext();
    const {setShowDeleteModal} = useGalleryWithDeleteContext();
    const {setMenuOpen} = useCardContext();

    //Is the button for setting a primary image disabled?
    const [btnDisabled, setBtnDisabled] = useState(false);

    //Do not display the buttons until the main image state is resolved.
    const [buttonsLoading, setButtonsLoading] = useState(dbTableName.includes('Images'));
    
    const routerDestinationUrl = getCardDestination(dbTableName, props.id);
    
    
    useEffect(() => {
        const tableWithMainImage: 'properties' | 'propertyEvents' | null = 
            dbTableName === 'propertyImages' ? 'properties' : 
            dbTableName === 'eventImages' ? 'propertyEvents' : 
            null;

        if(!tableWithMainImage) return;

        isMainImage(props.id, refId, tableWithMainImage)
        .then(res => {
            setBtnDisabled(res);
        })
        .finally(() => {
            setButtonsLoading(false);
        });
    }, []);

    var content: JSX.Element | null = null;

    if(buttonsLoading){
        content = <Spinner size="2rem"/>
    }
    else{
        const openLink = (
            <Link
                href={routerDestinationUrl}
                target="_blank"
                className={style.buttonLink}
            >Avaa</Link>
        );

        const setMainImageButton = (
            dbTableName === 'propertyImages' || dbTableName === 'eventImages'
            ?
            <Button
                className="primary"
                desktopText="Aseta Pääkuvaksi"
                onClick={async () => {
                    await serverUpdateDataById({isMainImage: true, refId}, props.id, dbTableName);
                    toast.success('Pääkuva vaihdettu onnistuneesti!');
                    setBtnDisabled(prev => !prev);
                }}
                disabled={btnDisabled}
            />
            :
            null
        );

        const deleteButton = (
            <Button
                className="danger"
                desktopText="Poista"
                onClick={() => {
                    dispatch({
                        type: 'select_id',
                        value: props.id,
                    });

                    setShowDeleteModal(true);
                    setMenuOpen(false);
                }}
            />
        );

        content = (
            <>
                {openLink}
                {setMainImageButton}
                {deleteButton}
            </>
        );
    }

    return (
        <HoverOverlay visible={props.showMenu}>
            {content}
        </HoverOverlay>
    );
}

function EventsMenu(props: HOCProps){
    const {dispatch} = useGalleryContext();
    const {setShowDeleteModal} = useGalleryWithDeleteContext();
    const {setMenuOpen} = useCardContext();

    return (
        <HoverOverlay visible={props.showMenu}>
            <Button
                className="primary"
                desktopText="Muokkaa"
                onClick={() => props.router.push(`/auth/events/${props.id}/info`)}
            />

            <Button
                className="danger"
                desktopText="Poista"
                onClick={() => {
                    dispatch({
                        type: 'select_id',
                        value: props.id,
                    });

                    setShowDeleteModal(true);
                    setMenuOpen(false);
                }}
            />
        </HoverOverlay>
    );
}


type MenuComponent = (props: HOCProps) => JSX.Element | null;

function getMenu(dbTableName: Kotilogi.Table): MenuComponent{
    switch(dbTableName){
        case 'properties':
           return (props: HOCProps) => <PropertiesMenu showMenu={props.showMenu} id={props.id} router={props.router}/>

        case 'propertyEvents':
            return (props: HOCProps) => <EventsMenu showMenu={props.showMenu} id={props.id} router={props.router}/>

        case 'propertyImages':
        case 'eventImages':
        case 'propertyFiles':
        case 'eventFiles':
            return (props: HOCProps) => <ObjectsMenu showMenu={props.showMenu} id={props.id} router={props.router}/>
    }

    return (props: HOCProps) => null;
}

export default function ImageContainer(props: Props){
    const {menuOpen, setMenuOpen, dbTableName, item} = useCardContext();
    const {refId} = useGalleryContext();

    const router = useRouter();

    const Menu = getMenu(dbTableName as Kotilogi.Table);

    return (
        <div 
            className={style.imageContainer} 
            onMouseEnter={() => setMenuOpen(true)} 
            onMouseLeave={() => setMenuOpen(false)}
            >

            <Menu showMenu={menuOpen} id={item.id} router={router} />

            <div className={style.gradient}/>
            <div className={style.title}>{props.title}</div>
          
            <Suspense fallback={<Spinner size="2rem"/>}>
                {
                    ['propertyFiles', 'eventFiles'].includes(dbTableName || '')
                    ?
                    <iframe src={props.imageUrl} className={style.image} seamless sandbox="allow-same-origin allow-scripts allow-popups allow-forms"/>
                    :
                    <img 
                        src={props.imageUrl} 
                        onError={undefined} 
                        className={style.image}
                        alt="Ei Kuvaa"
                    />
                }
            </Suspense>

            
        </div>
    )
}