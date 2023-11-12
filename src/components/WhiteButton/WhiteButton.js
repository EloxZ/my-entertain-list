import Link from "next/link";

export default function WhiteButton(props) {
    return (
        <Link href={props.href ?? ""} className={"py-3 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-200 hover:cursor-pointer " + props.className}>
            {props.text}
        </Link>
    )
}