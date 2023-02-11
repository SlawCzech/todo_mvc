
export function ClearCompleted(props) {
    return <>
        {!!props.tasks.filter(props.predicate).length && (
            <button onClick={props.onClick}>Clear completed</button>)}
    </>;
}