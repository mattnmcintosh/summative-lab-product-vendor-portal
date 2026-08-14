import { useOutletContext } from "react-router-dom";
import DoorCard from "./DoorCard";
import Search from "../components/Search";

function DoorList() {

    const { doors, query, setQuery } = useOutletContext();

    return (
        <>
        <Search query={query} onSearchChange={setQuery}/>
        <ul className="cards">
            {doors.map((door) => (
                <DoorCard key={door.id} door={door} />
            ))}
        </ul>
        </>
    )
    
}

export default DoorList;