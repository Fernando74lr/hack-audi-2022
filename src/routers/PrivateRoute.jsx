import { Navigate, Outlet } from "react-router-dom";

export const PrivateRoute = ({ isAuthenticated }) => {
    return (<div>
        {isAuthenticated ? <Outlet /> : <Navigate to="/auth/inicio-de-sesion" />}
    </div>);
}