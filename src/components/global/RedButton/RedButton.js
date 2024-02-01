import Link from "next/link";

export default function RedButton(props) {
    return (
        (props.isLink)?
        <Link href={props.href ?? '#'} onClick={props.onClick} className={"py-3 px-4 flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-red text-white hover-bg-darker-red hover:cursor-pointer " + props.className}>
            {props.icon}
            {props.text}
        </Link> :
        <button href={props.href ?? '#'} onClick={props.onClick} className={"py-3 px-4 flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-red text-white hover-bg-darker-red hover:cursor-pointer " + props.className}>
            {props.icon}
            {props.text}
        </button>
    )
}