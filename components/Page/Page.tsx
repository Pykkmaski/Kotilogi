import Gradient from '../Gradient/Gradient';
import Header from './Components/Header/Header';
import style from './style.module.scss';

type Props = {
    backgroundUrl?: string,
    children: React.ReactNode,
    headerContent?: JSX.Element,
}

export default function Page(props: Props){

    const backgroundUrl = props.backgroundUrl;
    const additionalStyles = {
        backgroundImage: backgroundUrl ? `url(${backgroundUrl})` : undefined,
    }

    return (
        <main className={style.page} style={additionalStyles}>
            <Gradient direction="bottom"/>
            <Header>
                {props.headerContent}
            </Header>
            {props.children}
        </main>
    )
}