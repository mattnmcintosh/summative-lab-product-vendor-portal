import { useOutletContext } from "react-router-dom";
import DoorCard from "./DoorCard";

function DoorList() {

    const { doors } = useOutletContext();

    return (
        <ul className="cards">
            {doors.map((door) => (
                <DoorCard key={door.id} door={door} />
            ))}
        </ul>
    )
    
}

export default DoorList;