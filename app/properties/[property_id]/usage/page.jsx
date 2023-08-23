import UsageGallery from './UsageGallery';

export default function UsagePage(props){
    const usage = [
        {
            amount: 10,
            date: new Date().getTime(),
        }
    ]

    return <UsageGallery usage={usage}/>
}