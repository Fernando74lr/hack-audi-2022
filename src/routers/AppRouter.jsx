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
import { Dashboard } from "../components/dashboard/Dashboard";
import { ULTDetail } from "../components/dashboard/ULTDetail";
import { FormItem } from "../components/forms/FormItem";
import { getUserInfo } from "../actions/user";
import { TableProfiles } from "../components/dashboard/TableProfiles";

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
				dispatch(getUserInfo(user.uid));
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
					{/* Public Routes */}
					<Route path="/" element={<PrivateRoute isAuthenticated={isLoggedIn} />}>
						<Route exact path="/" element={<Dashboard />} />
						<Route exact path="/test" element={<Test />} />
						<Route exact path="/new-item" element={<FormItem />} />
						<Route exact path="/ult-detail/:ultId" element={<ULTDetail />} />
						<Route exact path="/profiles-management" element={<TableProfiles />} />
						<Route path="*" element={<Navigate to="/" />} />
					</Route>

					{/* Authentication */}
					<Route path="/auth" element={<PublicRoute isAuthenticated={isLoggedIn} />}>
						<Route exact path="/auth" element={<Authentication />} />
						<Route path="*" element={<Navigate to="/" />} />
					</Route>

				</Routes>
			</Fragment>
		</BrowserRouter>
	)
}
