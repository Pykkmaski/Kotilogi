import { Group } from '../Group/Group';
import { Header } from '../Header/Header';
import style from './style.module.scss';

type EditCardProps = React.PropsWithChildren & {
    title: string,
}

export function EditCard({children, ...props}: EditCardProps){
    return (
        <div className={style.container}>
            <Header border={true}>
                <span className={style.title}>{props.title}</span>
            </Header>

            <Group direction="vertical" gap="2rem">
                {children}
            </Group>
        </div>
    );
}