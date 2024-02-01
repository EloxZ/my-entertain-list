import Link from "next/link";

export default function ElectricButton(props) {
    return (
        (props.isLink)?
        <Link href={props.href ?? '#'} onClick={props.onClick} className={"py-2 px-4 flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-electric-violet text-white hover-bg-darker-electric-violet hover:cursor-pointer " + props.className}>
            {props.icon}
            {props.text}
        </Link> :
        <button href={props.href ?? '#'} onClick={props.onClick} className={"py-2 px-4 flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-electric-violet text-white hover-bg-darker-electric-violet hover:cursor-pointer " + props.className}>
            {props.icon}
            {props.text}
        </button>
    )
}