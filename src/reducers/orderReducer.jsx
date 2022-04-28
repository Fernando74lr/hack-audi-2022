import { types } from "../types/types";

const initialState = [];

export const ordersReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.setOrders:
            return action.payload;

        case types.cleanOrders:
            return initialState;

        default:
            return state;
    };
};
