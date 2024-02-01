export default function RightGroupButton(props) {
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
        <div onClick={(props.isDisabled)? undefined : props.onClick}  className={props.className + addClass + " group-button px-3 py-1 text-sm font-medium border-t border-b border-r rounded-e-lg border-gray-200 hover:cursor-pointer focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700"}>
            {props.text}
        </div>
    )
}