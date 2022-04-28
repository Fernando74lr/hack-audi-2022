import { doc, setDoc, getDoc } from "@firebase/firestore";
import { Timestamp } from "firebase/firestore";
import { db } from "../firebase/firebase-config";
import { cleanMessage } from "../helpers/helpers";
import { toastSW } from "../helpers/sweetAlert2";
import { types } from "../types/types";

export const setUser = (data) => ({
    type: types.setUser,
    payload: data,
});

export const cleanUser = () => ({
    type: types.cleanUser
});

export const createUser = (uid, name, email) => {
    return () => {
        const newUser = {
            uid: uid,
            name: name,
            email: email,
            userType: 0, // 0: full access
            created: Timestamp.fromDate(new Date())
        };

        setDoc(doc(db, "users", `${uid}`), newUser)
            .then(() => {
                toastSW('success', 'User created successfully!');
            })
            .catch((error) => {
                console.log('[User] ', cleanMessage(error));
                toastSW('error', 'Error when creating user...');
            });
    };
};

export const getUserInfo = (uid) => {
    return (dispatch) => {
        const docRef = doc(db, 'users', uid);
        getDoc(docRef)
            .then((user) => {
                dispatch(setUser({ uid: uid, data: user.data() }));
            })
            .catch((error) => {
                console.log(error);
                toastSW('error', 'Error when getting user\'s data...');
            })
    };
};