import Logo from "../../global/Logo/Logo";
import Menu from "../Menu/Menu";
import WhiteButton from "@/components/global/WhiteButton/WhiteButton";

export default function Navbar(props) {
    return (
        <div className="bg-haiti h-20 flex justify-between">
            <Logo/>
            <Menu/>
            <WhiteButton text="MY LIST" className="h-12 mt-4 mr-5"/>
        </div>
    )
}