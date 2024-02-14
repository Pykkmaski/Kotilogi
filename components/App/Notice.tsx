export default function Notice(props: {text: string}){
    return (
        <div className="w-full z-40 fixed bottom-0 left-0 bg-red-500 text-center py-2 text-white font-semibold">
            <span className="xs:text-sm lg:text-base">
                {props.text}
            </span>
        </div>
    );
}