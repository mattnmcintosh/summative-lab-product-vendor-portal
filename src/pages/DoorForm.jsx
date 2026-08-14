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

/*
return (
    <div>
      <h2>Add New Movie</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Movie Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Duration (minutes)"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Genres (comma-separated)"
          value={genres}
          onChange={(e) => setGenres(e.target.value)}
          required
        />
        <button type="submit">Add Movie</button>
      </form>
    </div>
  )

        "id": 1,
      "material": "Solid Oak",
      "height": 80,
      "width": 36,
      "manufacturer": "JELD-WEN",
      "price": 450.00
*/