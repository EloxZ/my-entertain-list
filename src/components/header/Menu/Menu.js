import MenuButton from "../MenuButton/MenuButton";

export default function Menu(props) {
    return (
        <div className="border-b-2 border-white h-10 mt-6">
            <nav className="-mb-0.5 flex space-x-6">
                <MenuButton text="Feed"/>
                <MenuButton text="Movies" isActive={true}/>
                <MenuButton text="TV Shows"/>
            </nav>
        </div>
    )
}