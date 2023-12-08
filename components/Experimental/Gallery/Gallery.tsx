import { ModalProps } from "kotilogi-app/components/Modals/Modal";
import Item from "./Item"
import style from './style.module.scss';
import Button from "kotilogi-app/components/Button/Button";

export default function Gallery(props: {
    data: any[],
    title: string,
    ItemElement: React.FC<{
        item: any,
    }>,

    AddModal?: React.FC<ModalProps>,
    DeleteModal?: React.FC<ModalProps>,
    EditModal?: React.FC<ModalProps>,
}){

    return (
        <div className={style.container}>
            <div className={style.header}>
                <h1>{props.title}</h1>
                <div>
                    {
                        props.AddModal ? 
                        <>
                            <props.AddModal show={false} onHide={() => null} id={`gallery-${props.title}-add-modal`}/>
                            <Button
                                className="primary"
                                desktopText="Lisää Uusi"
                            />
                        </>
                        :
                        null
                    }
                    
                </div>
                
            </div>
            <div className={style.body}>
                {
                    props.data.map((item, index) => {
                        return <props.ItemElement item={item} key={`gallery-item-${index}`}/>
                    })
                }  
            </div>
        </div>  
    );
}