function DoorCard({ door }) {

    if (!door) return <h2>Loading or door not found.</h2>

    return (
        <div className="card">
            <h2>{door.material} by {door.manufacturer}</h2>
            <p>{door.height} x {door.width}</p>
            <p>Price: ${door.price}</p>
        </div>
    )
}

export default DoorCard