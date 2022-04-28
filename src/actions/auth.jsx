import { types } from "../types/types";
import {
    getAuth,
    signOut,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
} from 'firebase/auth';
import { app } from "../firebase/firebase-config";
import { toastSW } from "../helpers/sweetAlert2";
import { cleanMessage } from "../helpers/helpers";
import { cleanUser, createUser } from "./user";
import { cleanOrders } from "./order";

const auth = getAuth(app);

export const login = (uid, name) => ({
    type: types.login,
    payload: {
        uid: uid,
        displayName: name,
    },
});

export const logout = () => ({
    type: types.logout,
});

export const startLogout = () => {
    return (dispatch) => {
        dispatch(logout());
        dispatch(cleanUser());
        dispatch(cleanOrders());
        signOut(auth)
            .then(() => toastSW('success', 'Auf wiedersehen!'))
            .catch((error) => toastSW('error', cleanMessage(error)));
    };
};

export const startLoginEmailPassword = (email, password) => {
    return (dispatch) => {
        signInWithEmailAndPassword(auth, email, password)
            .then(({ user }) => {
                dispatch(login(user.uid, user.displayName));
                toastSW('success', '¡Bienvenido!');
            })
            .catch((error) => {
                console.log('[Auth] Login ', error);
                toastSW('error', cleanMessage(error));
            })
    };
};

export const startRegisterWithEmailPasswordName = (email, password, name) => {
    return (dispatch) => {
        createUserWithEmailAndPassword(auth, email, password)
            .then(({ user }) => {
                dispatch(login(user.uid, user.displayName));
                dispatch(createUser(user.uid, name, email));
                // toastSW('success', '¡Registrado!');
            })
            .catch((error) => {
                toastSW('error', cleanMessage(error));
            });
    };
};