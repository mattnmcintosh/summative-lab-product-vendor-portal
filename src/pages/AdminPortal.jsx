import NavBar from "../components/NavBar";
import { Outlet } from 'react-router-dom';

function AdminPortal() {
    return (
        <>
        <NavBar />
        <main>
            <h1>Add new doors here</h1>
            <Outlet />
        </main>
        </>
    )
}

export default AdminPortal;