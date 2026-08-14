import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css'
import Home from "./pages/Home";
import DoorContainer from "./pages/DoorContainer";
import DoorCard from "./pages/DoorCard";
import AdminPortal from "./pages/AdminPortal";
import DoorForm from "./pages/DoorForm";
import ErrorPage from "./pages/ErrorPage";

function App() {
  
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/store" element={<DoorContainer />}>
          <Route path="/:id" element={<DoorCard />} />
        </Route>
        <Route path="/admin" element={<AdminPortal />}>
          <Route path="/new" element={<DoorForm />} />
        </Route>
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App