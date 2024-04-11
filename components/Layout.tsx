/**Renders the children with a pre-determined style required by the design of the page. */
export function Layout({ children }: React.PropsWithChildren) {
  return (
    <div className="flex flex-col flex-1 relative mt-2 h-full">{children}</div>
  );
}

export function LayoutNavBarContainer({ children }) {
  return (
    <div className="xs:hidden md:flex flex-2 flex-col pl-32 bg-gray-600 pt-8 pr-8 sticky top-0 h-screen w-[21%]">
      {children}
    </div>
  );
}

export function LayoutContentContainer({ children }) {
  return (
    <div className="flex-[9] xs:ml-0 mb-8 md:pr-32 xs:px-4 pt-8">
      {children}
    </div>
  );
}

export function NavDivider() {
  return <div className="bg-slate-400 h-[1px] w-full mt-4 mb-4" />;
}
