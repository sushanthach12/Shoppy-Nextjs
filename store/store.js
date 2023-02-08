import { combineReducers, configureStore } from "@reduxjs/toolkit";

import userReducer from "./userSlice";
import { createWrapper } from "next-redux-wrapper";
import storage from "redux-persist/lib/storage";
import { FLUSH, PAUSE, PERSIST, persistReducer, persistStore, PURGE, REGISTER, REHYDRATE } from "redux-persist";

const persistConfig = {
    key: 'root',
    version: 1,
    storage
}

const Reducer = combineReducers({
    users: userReducer
})

const rootReducer = (state, action) => {
    if (action.type === 'users/logout') {
        state.user = undefined;
    }
    return Reducer(state, action);
};

const persistedReducer = persistReducer(persistConfig, rootReducer)

export let store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
})
export const persistor = persistStore(store)
// export const wrapper = createWrapper(store)