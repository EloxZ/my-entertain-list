export default function UsernameInput(props) {
    return (
        <div className="relative">
            <input type="email" className={"peer py-3 px-4 ps-11 block w-full bg-white rounded-lg text-sm text-black " + props.className} placeholder="Username"/>
            <div className="absolute inset-y-0 start-0 flex items-center pointer-events-none ps-4">
                <svg className="flex-shrink-0 w-4 h-4 text-vivid-violet" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
            </div>
        </div>
    )
}