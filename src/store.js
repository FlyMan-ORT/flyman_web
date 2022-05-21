import { configureStore } from "@reduxjs/toolkit";
import counterReducer from './features/counter';
import loginReducer from './features/login'

export const store = configureStore({ 
    reducer: {
        login: loginReducer,
    }
 });