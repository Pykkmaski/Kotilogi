function useSubComponents(subComponentList, props){
    return subComponentList.map((key) => {
        return React.Children.map(props.children, (child) => 
            child.type.name === key ? child : null
        );
    });
}

export default useSubComponents;