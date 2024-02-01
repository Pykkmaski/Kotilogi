export default function Notice(props: {text: string}){
    return (
        <div className="w-full mt-auto bg-red-500 text-center pt-2 pb-2 text-white font-semibold">
            {props.text}
        </div>
    );
}