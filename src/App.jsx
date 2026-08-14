import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css'
import Home from "./pages/Home";
import DoorContainer from "./pages/DoorContainer";
import AdminPortal from "./pages/AdminPortal";
import DoorForm from "./pages/DoorForm";
import DoorEditForm from "./pages/DoorEditForm";
import DoorList from "./pages/DoorList";
import ErrorPage from "./pages/ErrorPage";

function App() {
  
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/store" element={<DoorContainer />}>
          <Route path="" element={<DoorList />} />
          <Route path=":id/edit" element={<DoorEditForm />} />
        </Route>
        <Route path="/admin" element={<AdminPortal />}>
          <Route path="" element={<DoorForm />} />
        </Route>
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App