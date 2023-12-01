import Link from "next/link";

export default function MenuButton(props) {
    const classAdd = (props.isActive)? "border-electric-violet text-electric-violet" : "text-white border-transparent";
    return (
        <Link href={props.href} className={"h-10 px-4 inline-flex items-center gap-2 border-b-2 whitespace-nowrap hover-text-electric-violet focus:outline-none " + classAdd}>
            {props.icon}
            <p>{props.text}</p>
        </Link>
    )
}