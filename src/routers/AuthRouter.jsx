import { Navigate, Route, Routes } from "react-router-dom";
import { LoginForm } from "../components/auth/inicio-de-sesion/LoginForm";

export const AuthRouter = () => {
    return (
        <div>
            <Routes>
                <Route
                    path="/auth/inicio-de-sesion"
                    component={LoginForm}
                />

                <Route>
                    <Navigate to="/auth/inicio-de-sesion" />
                </Route>
            </Routes>
        </div>
    );
}
