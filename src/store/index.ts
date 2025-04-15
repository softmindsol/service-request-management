// store/index.ts
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";

import orderReducer from "./slices/orderSlice";
import categoryReducer from "./slices/categorySlice";
import userReducer from "./slices/userSlice";

// 🔒 Root persist config (exclude user)
const persistConfig = {
  key: "root",
  storage,
  blacklist: ["user"], // ❌ Don't persist user slice
};

const rootReducer = combineReducers({
  orders: orderReducer,
  categories: categoryReducer,
  user: userReducer, // 👈 used normally, not persisted
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
