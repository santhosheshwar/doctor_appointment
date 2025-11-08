import { Navigate, Outlet } from "react-router-dom";

// eslint-disable-next-line react/prop-types
const ProtectedRoute = ({ isAuthenticated }) => {
    if (!isAuthenticated) {
        return <Navigate to="/" replace />;
    }
    return <Outlet />;
};

export default ProtectedRoute;
