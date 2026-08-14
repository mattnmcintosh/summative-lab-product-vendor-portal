import { useDeleteDoor } from "../hooks/useDeleteDoor";
import { useNavigate, useOutletContext } from "react-router-dom";

function DoorCard({ door, onDoorDelete }) {

    const { deleteDoor, isDeleting, error } = useDeleteDoor();
    const navigate = useNavigate();
    const { removeDoorFromList } = useOutletContext();

    const handleDelete = async () => {
    if (window.confirm(`Are you sure you want to delete this ${door.material} door?`)) {
      try {
        await deleteDoor(door.id);
        removeDoorFromList(door.id);
        if (onDoorDelete) {
          onDoorDelete(door.id);
        }
      } catch (err) {
        console.error("Delete failed:", err);
      }
    }
  };

    if (!door) return <h2>Loading or door not found.</h2>

    return (
        <div className="card">
            <h2>{door.material} by {door.manufacturer}</h2>
            <p>{door.height} x {door.width}</p>
            <p>Price: ${door.price}</p>

            {error && <p style={{ color: "red" }}>{error}</p>}
      
            <button 
                type="button"
                className="btn-edit" 
                onClick={() => navigate(`/store/${door.id}/edit`)}
                style={{ marginTop: "0.5rem" }}
            >
                Edit Door
            </button>
            <button 
                onClick={handleDelete}
                className="btn-delete" 
                disabled={isDeleting}
                style={{ marginTop: "0.5rem", backgroundColor: "#ef4444", color: "#fff" }}
            >
                {isDeleting ? "Deleting..." : "Delete Door"}
            </button>
        </div>
    )
}

export default DoorCard