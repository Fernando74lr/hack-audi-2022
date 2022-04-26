import { types } from "../types/types";
import {
    getAuth,
    signOut,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
} from 'firebase/auth';
import { app } from "../firebase/firebase-config";

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
        signOut(auth);
        console.log('Me salí');
    };
};

export const startLoginEmailPassword = (email, password) => {
    return (dispatch) => {
        signInWithEmailAndPassword(auth, email, password)
            .then(({ user }) => {
                console.log("¡Bienvenido!");
                dispatch(login(user.uid, user.displayName));
            })
            .catch((error) => {
                console.log('[Auth] Login ', error);
            })
    };
};

export const startRegisterWithEmailPasswordName = (email, password) => {
    return (dispatch) => {
        createUserWithEmailAndPassword(auth, email, password)
            .then(({ user }) => {
                console.log("¡Registrado!");
                dispatch(login(user.uid, user.displayName));
            })
            .catch((error) => {
                console.log('[Auth] Register ', error);
            });
    };
};