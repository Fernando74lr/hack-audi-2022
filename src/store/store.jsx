import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
// import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import { authReducer } from '../reducers/authReducer';
import { pageReducer } from '../reducers/pageReducer';

const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const reducers = combineReducers({
    auth: authReducer,
    page: pageReducer
});

export const store = createStore(
    reducers,
    composeEnhancers(
        applyMiddleware(thunk)
    )
);