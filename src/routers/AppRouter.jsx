import { getAuth, onAuthStateChanged } from "@firebase/auth";
import { Fragment } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { PrivateRoute } from "./PrivateRoute";
import { PublicRoute } from "./PublicRoute";
import { useEffect, useState } from "react";
import { login } from "../actions/auth";
import { useDispatch, useSelector } from "react-redux";
import { CircularProgress } from "@mui/material";
import { ToastContainer } from "react-bootstrap";
import { Authentication } from "../components/auth/Authentication";
import { Test } from "../components/Test";

export const AppRouter = () => {
	const dispatch = useDispatch();
	const [checking, setsChecking] = useState(true);
	const [isLoggedIn, setIsLoggedIn] = useState(false);

	useEffect(() => {
		const auth = getAuth();
		onAuthStateChanged(auth, async (user) => {
			if (user?.uid) {
				dispatch(login(user.uid, user.displayName));
				setIsLoggedIn(true);
				// dispatch(userInfo(await getUserInfo(user?.uid)));
				// dispatch(getConsults());
			} else {
				setIsLoggedIn(false);
			}

			setsChecking(false);
		})
		console.log('App Router');
	}, [dispatch]);

	if (checking) {
		return (
			<center style={{ padding: '20%' }}>
				<CircularProgress />
			</center>
		);
	}

	return (
		<BrowserRouter>
			<Fragment>
				<ToastContainer />
				<Routes>
					{/* Private */}
					{/* <Route exact path="/" element={<PrivateRoute isAuthenticated={isLoggedIn} />}>
						<Route exact path="/" element={<DashboardSummary summary />} />
						<Route path="*" element={<Navigate to="/" />} />
					</Route> */}

					{/* Public Routes */}
					<Route path="/" element={<PrivateRoute isAuthenticated={isLoggedIn} />}>
						<Route exact path="/" element={<Test />} />
						<Route path="*" element={<Navigate to="/" />} />
					</Route>

					{/* Authentication */}
					<Route path="/auth" element={<PublicRoute isAuthenticated={isLoggedIn} />}>
						<Route exact path="/auth/inicio-de-sesion" element={<Authentication />} />
						<Route path="*" element={<Navigate to="/" />} />
					</Route>

				</Routes>
			</Fragment>
		</BrowserRouter>
	)
}
