import { types } from "../types/types";

const initialState = "Dashboard";

export const pageReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.page:
            return action.payload;

        default:
            return state;
    };
};
