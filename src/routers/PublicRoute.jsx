import { Navigate, Outlet } from "react-router-dom"

export const PublicRoute = ({ isAuthenticated }) => {
    return (
        isAuthenticated ? <Navigate to="/" /> : <Outlet />
    )
}