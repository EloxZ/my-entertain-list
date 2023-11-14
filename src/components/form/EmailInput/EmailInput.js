export default function EmailInput(props) {
    return (
        <div className="relative">
            <input type="email" className={"peer py-3 px-4 ps-11 block w-full bg-white rounded-lg text-sm text-black " + props.className} placeholder={props.placeholder ?? "Email"} value={props.value} onChange={props.onChange}/>
            <div className="absolute inset-y-0 start-0 flex items-center pointer-events-none ps-4">
                <svg className="w-4 h-4 text-electric-violet" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" width="24" height="24">
                    <path strokeLinecap="round" d="M16.5 12a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zm0 0c0 1.657 1.007 3 2.25 3S21 13.657 21 12a9 9 0 10-2.636 6.364M16.5 12V8.25" />
                </svg>
            </div>
        </div>
    )
}
