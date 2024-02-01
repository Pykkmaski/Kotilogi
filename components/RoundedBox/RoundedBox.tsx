import { Group } from '../Group/Group';
import { BorderHeader } from '../Header/Header';
import { BoxHeading } from '../Heading/Heading';
import style from './style.module.scss';

export function RoundedBox({children}: React.PropsWithChildren){
    return (
        <div className="flex flex-col border rounded-lg bg-white p-4">
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
            <div className="w-full">
                <Group direction="col" gap={4}>
                    <BorderHeader>
                        <BoxHeading>{title}</BoxHeading>
                    </BorderHeader>
                    {children}
                </Group>
            </div>
        </RoundedBox>
    );
}