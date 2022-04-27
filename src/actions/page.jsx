import { types } from "../types/types";

export const setCurrentPage = (newPage) => ({
    type: types.page,
    payload: newPage,
});