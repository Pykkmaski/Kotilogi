import './Style.scss';

export default function GridItem({content, id = ''}){
    return (
        <div className="grid-item" id={id}>
            {content}
        </div>
    );
}