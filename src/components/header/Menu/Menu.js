import MovieSVG from "@/components/icons/MovieSVG/MovieSVG";
import MenuButton from "../MenuButton/MenuButton";
import ShowSVG from "@/components/icons/ShowSVG/ShowSVG";
import FeedSVG from "@/components/icons/FeedSVG/FeedSVG";
import ListSVG from "@/components/icons/ListSVG/ListSVG";

export default function Menu(props) {
    const movieIcon = <MovieSVG/>
    const showIcon = <ShowSVG/>
    const feedIcon = <FeedSVG/>
    const listIcon = <ListSVG/>
    
    return (
        <div className="border-b-2 border-white h-10 nav-menu">
            <nav className="-mb-0.5 flex">
                {//<MenuButton icon={feedIcon} href="/feed" text="Feed" isActive={props.active === "feed" ?? false}/>
                }
                <MenuButton icon={showIcon} href="/shows" text="Shows" isActive={props.active === "shows" ?? false}/>
                <MenuButton icon={movieIcon} href="/movies" text="Movies" isActive={props.active === "movies" ?? false}/>
                <MenuButton icon={listIcon} href="/list" text="List" isActive={props.active === "list" ?? false}/>
            </nav>
        </div>
    )
}