import { BorderHeader } from "../Header/Header";
import { BoxHeading } from "../Heading";

export function RoundedBox({ children }: React.PropsWithChildren) {
  return (
    <div className="flex flex-col border rounded-lg bg-white p-4 shadow-lg h-full max-h-full">
      {children}
    </div>
  );
}

type ContentCardProps = React.PropsWithChildren & {
  title: string;
};

export function ContentCard({ children, title }: ContentCardProps) {
  return (
    <RoundedBox>
      <div className="w-full">
        <div className="flex flex-col gap-4">
          <BorderHeader>
            <BoxHeading>{title}</BoxHeading>
          </BorderHeader>
          {children}
        </div>
      </div>
    </RoundedBox>
  );
}
