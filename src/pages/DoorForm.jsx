import { useState } from "react";
import { useAddDoor } from "../hooks/useAddDoor";
import { useNavigate } from "react-router-dom";

function DoorForm() {

  const navigate = useNavigate();

  const { addDoor, isSubmitting, error } = useAddDoor();
  const [formData, setFormData] = useState({
    material: "",
    manufacturer: "",
    height: "",
    width: "",
    price: "",
  });

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
      
      await addDoor(formattedData);
      navigate("/store");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h2>Add New Door</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input name="material" placeholder="Material" onChange={handleChange} required />
        <input name="manufacturer" placeholder="Manufacturer" onChange={handleChange} required />
        <input name="height" type="number" placeholder="Height" onChange={handleChange} required />
        <input name="width" type="number" placeholder="Width" onChange={handleChange} required />
        <input name="price" type="number" step="0.01" placeholder="Price" onChange={handleChange} required />
        <button type="submit" class="btn-primary" disabled={isSubmitting}>
          {isSubmitting ? "Adding..." : "Add Door"}
        </button>
      </form>
    </div>
  );
}

export default DoorForm;