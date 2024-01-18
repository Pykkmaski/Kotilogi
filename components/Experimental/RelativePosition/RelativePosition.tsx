export function RelativePosition({children}){
    return (
        <div style={{
            position: 'relative',
        }}>
            {children}
        </div>
    );
}