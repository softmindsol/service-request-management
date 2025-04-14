// store/index.ts
import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import storage from "redux-persist/lib/storage"; // localStorage
import { persistReducer, persistStore } from "redux-persist";

import orderReducer from "./slices/orderSlice";
import categoryReducer from "./slices/categorySlice";
import userReducer from './slices/userSlice'
const persistConfig = {
  key: "root",
  storage,
};

const rootReducer = combineReducers({
  orders: orderReducer,
  categories: categoryReducer,
  user:userReducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
