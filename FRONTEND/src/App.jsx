import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import ProtectedRoute from "./components/protectedRoute.jsx";
import Login from "./pages/Login";
import Register from "./pages/Register";
import HomePage from "./pages/HomePage";
import Appointment from "./pages/Appointment";
import Doctors from "./pages/doctors";
import Admin from "./pages/Admin";
import DoctorDashboard from "./pages/DoctorDashboard";
import "antd/dist/reset.css";
import "./index.css";

function App() {
    const [name, setName] = useState("");
    const [isAuthenticated, setIsAuthenticated] = useState(
        !!localStorage.getItem("token")
    );

    return (
        <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
                    <Route path="/register" element={<Register setName={setName} />} />

                    <Route element={<ProtectedRoute isAuthenticated={isAuthenticated} />}>
                        <Route
                            path="/homepage"
                            element={<HomePage name={name} setIsAuthenticated={setIsAuthenticated} />}
                        />
                        <Route
                            path="/appointment"
                            element={<Appointment setName={setName} setIsAuthenticated={setIsAuthenticated} />}
                        />
                        <Route
                            path="/doctorspage"
                            element={<Doctors setIsAuthenticated={setIsAuthenticated} />}
                        />
                        <Route
                            path="/adminhomepage"
                            element={<Admin setIsAuthenticated={setIsAuthenticated} />}
                        />
                        <Route
                            path="/doctorpage"
                            element={<DoctorDashboard setIsAuthenticated={setIsAuthenticated} />}
                        />
                    </Route>
                </Routes>
        </BrowserRouter>
    );
}

export default App;
