import Button from "kotilogi-app/components/Button/Button";
import { SetStateAction } from "react";

export default function ContentSectionHeader(props: {
    setContentSection: React.Dispatch<SetStateAction<'images' | 'files'>>,
}){
    return (
        <div className={'content-section-header'}>
            <nav>
                <div className="links">
                    <span onClick={() => props.setContentSection('images')}>Kuvat</span>
                    <span onClick={() => props.setContentSection('files')}>Tiedostot</span>
                </div>
            </nav>

            <Button
                className="primary"
                desktopText="Lisää Uusi"
            />
        </div>
    )
}