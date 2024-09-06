import { combineReducers, configureStore } from "@reduxjs/toolkit";
import gitUserDetailsReducer from "../slices/gitUserDetailsSlice";
const rootReducers= combineReducers({
    gitUser:gitUserDetailsReducer
})

const store = configureStore({
    reducer:rootReducers,
    middleware:(getDefaultMiddleware) => 
        getDefaultMiddleware({
            serializableCheck:true
        })
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;