export default function LeftGroupButton(props) {
    let addClass;

    if (props.isSelected) {
        addClass = " hover-bg-darker-electric-violet text-white bg-electric-violet";
    } else {
        addClass = " bg-white";
        if (props.isDisabled) {
            addClass += " text-gray-400";
        } else {
            addClass += " hover:bg-gray-100 hover-text-electric-violet text-gray-900";
        }
    }
    
    return (
        <a onClick={(props.isDisabled)? undefined : props.onClick}  className={props.className + addClass + " px-4 py-2 text-sm font-medium border rounded-s-lg border-gray-200 hover:cursor-pointer"}>
            {props.text}
        </a>
    )
}