import { doc, setDoc } from "@firebase/firestore";
import { Timestamp } from "firebase/firestore";
import { db } from "../firebase/firebase-config";
import { cleanMessage } from "../helpers/helpers";
import { toastSW } from "../helpers/sweetAlert2";

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