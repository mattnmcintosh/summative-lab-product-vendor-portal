import './NavBar.css'
import { NavLink } from "react-router-dom"

function NavBar() {
    return (
        <nav className="navbar">
            <NavLink to="/" end>Home</NavLink>
            <NavLink to="/store" end>Shop</NavLink>
            <NavLink to="/admin" end>Admin Portal</NavLink>
        </nav>
    )
}