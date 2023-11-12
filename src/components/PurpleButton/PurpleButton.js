import Link from "next/link";

export default function PurpleButton(props) {
    return (
        <Link href={props.href ?? ""} className={"py-3 px-4 block items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-vivid-violet text-white hover-bg-vivid-violet hover:cursor-pointer " + props.className}>
            {props.text}
        </Link>
    )
}