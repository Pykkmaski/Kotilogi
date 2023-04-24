function HorizontalBox(props){
    return (
        <div className="d-flex flex-row center-align space-between gap-l px-10">
            {
                props.children
            }
        </div>
    )
}

export default HorizontalBox;