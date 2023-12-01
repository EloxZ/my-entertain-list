import Logo from "../../global/Logo/Logo";
import Menu from "../Menu/Menu";
import WhiteButton from "@/components/global/WhiteButton/WhiteButton";

export default function Navbar(props) {
    return (
        <div className="bg-haiti h-20 flex justify-between navbar align-center">
            <Logo className="nav-logo"/>
            <Menu active={props.active}/>
            <div className="nav-space"></div>
        </div>
    )
}