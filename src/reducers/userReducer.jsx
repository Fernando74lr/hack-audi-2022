import { types } from "../types/types";

const initialState = {};

export const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.setUser:
            return action.payload;

        case types.cleanUser:
            return initialState;

        default:
            return state;
    };
};
