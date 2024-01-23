import { Group } from '../Group/Group';
import { BorderHeader } from '../Header/Header';
import { BoxHeading } from '../Heading/Heading';
import style from './style.module.scss';

export function RoundedBox({children}: React.PropsWithChildren){
    return (
        <div className={style.container}>
            {children}
        </div>
    );
}

type ContentCardProps = React.PropsWithChildren & {
    title: string,
}

export function ContentCard({children, title}: ContentCardProps){
    return (
        <RoundedBox>
            <Group direction="vertical" gap="1rem">
                <BorderHeader>
                    <BoxHeading>{title}</BoxHeading>
                </BorderHeader>
                {children}
            </Group>
        </RoundedBox>
    );
}