export default function PasswordInput(props) {
    return (
        <div className="relative">
            <input type="password" className={"peer py-3 px-4 ps-11 block w-full bg-white rounded-lg text-sm text-black " + props.className} placeholder="Password"/>
            <div className="absolute inset-y-0 start-0 flex items-center pointer-events-none ps-4">
                <svg className="flex-shrink-0 w-4 h-4 text-vivid-violet" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 18v3c0 .6.4 1 1 1h4v-3h3v-3h2l1.4-1.4a6.5 6.5 0 1 0-4-4Z"/><circle cx="16.5" cy="7.5" r=".5"/></svg>
            </div>
        </div>
    )
}