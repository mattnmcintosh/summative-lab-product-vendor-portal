import { useState, useEffect } from "react";
import { useParams, useNavigate, useOutletContext } from "react-router-dom";
import { usePatchDoor } from "../hooks/usePatchDoor";

function DoorEditForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { doors, updateDoorInList } = useOutletContext();

  const { patchDoor, isUpdating, error } = usePatchDoor();

  const [formData, setFormData] = useState({
    material: "",
    manufacturer: "",
    height: "",
    width: "",
    price: "",
  });

  useEffect(() => {
    // Find door from context
    const existingDoor = doors.find((d) => d.id.toString() === id.toString());

    if (existingDoor) {
      setFormData({
        material: existingDoor.material,
        manufacturer: existingDoor.manufacturer,
        height: existingDoor.height,
        width: existingDoor.width,
        price: existingDoor.price,
      });
    }
  }, [id, doors]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formattedData = {
        ...formData,
        height: Number(formData.height),
        width: Number(formData.width),
        price: Number(formData.price),
      };

      const updatedDoor = await patchDoor(id, formattedData);
      updateDoorInList(updatedDoor);
      // Navigates back to /store to view the updated inventory list
      navigate("/store");
    } catch (err) {
      console.error("Failed to patch door:", err);
    }
  };

  return (
    <div>
      <h2>Edit Door</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          name="material"
          placeholder="Material"
          value={formData.material}
          onChange={handleChange}
          required
        />
        <input
          name="manufacturer"
          placeholder="Manufacturer"
          value={formData.manufacturer}
          onChange={handleChange}
          required
        />
        <input
          name="height"
          type="number"
          placeholder="Height"
          value={formData.height}
          onChange={handleChange}
          required
        />
        <input
          name="width"
          type="number"
          placeholder="Width"
          value={formData.width}
          onChange={handleChange}
          required
        />
        <input
          name="price"
          type="number"
          step="0.01"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
          required
        />
        <button type="submit" className="btn-primary" disabled={isUpdating}>
          {isUpdating ? "Saving..." : "Save Changes"}
        </button>
        <button 
          type="button" 
          className="btn-cancel"
          onClick={() => navigate("/store")} 
          style={{ marginLeft: "0.5rem" }}
        >
          Cancel
        </button>
      </form>
    </div>
  );
}

export default DoorEditForm;