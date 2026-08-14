function DoorForm() {

    return (
        <div>
            <h2>Add New Door</h2>
            <form>
                <input
                    type="text"
                    placeholder="Material"
                    required
                    />
                <input 
                    type="text"
                    placeholder="Manufacturer"
                    required
                    />
                <input
                    type="number"
                    placeholder="Height"
                    required />
                <input 
                    type="number"
                    placeholder="Width"
                    required
                    />
                <input
                    type="number"
                    step="0.01"
                    placeholder="Price"
                    />
                <button type="submit">Add Door</button>
            </form>
        </div>
    )
}

export default DoorForm;