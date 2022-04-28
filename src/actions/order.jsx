import { addDoc, collection, getDocs } from "@firebase/firestore";
import { Timestamp } from "firebase/firestore";
import { db } from "../firebase/firebase-config";
import { cleanMessage } from "../helpers/helpers";
import { toastSW } from "../helpers/sweetAlert2";
import { types } from "../types/types";

export const setOrders = (orders) => ({
    type: types.setOrders,
    payload: orders,
});

export const cleanOrders = () => ({
    type: types.cleanOrders,
});

export const createOrder = (order) => {
    return () => {
        const newOrder = {
            ...order,
            created: Timestamp.fromDate(new Date())
        };

        addDoc(collection(db, "orders"), newOrder)
            .then(() => {
                toastSW('success', 'Order created successfully!');
            })
            .catch((error) => {
                console.log('[User] ', cleanMessage(error));
                toastSW('error', 'Error when creating Order...');
            });
    };
};

export const getOrders = () => {
    return (dispatch) => {
        const docRef = collection(db, 'orders');
        getDocs(docRef)
            .then((docSnap) => {
                let orders = [];
                docSnap.forEach((doc) => {
                    orders.push({ uid: doc.id, ...doc.data() })
                });
                dispatch(setOrders(orders));
            })
            .catch((error) => {
                console.log(error);
            })
    }
};