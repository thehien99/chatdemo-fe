import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import localStorage from "redux-persist/es/storage";
import storage from "redux-persist/lib/storage";
import autoMergeLevel2 from "redux-persist/es/stateReconciler/autoMergeLevel2";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
  persistReducer,
  persistStore,
} from "redux-persist";
import authReducer from "./reducers/authReducer";
import messReducer from "./reducers/messReducer";


const persitConfig = {
  key: 'auth',
  storage: localStorage,
  whitelist: ['auth'],
  stateReconciler: autoMergeLevel2,
}

const authConfig = {
  key: 'auth',
  storage: localStorage,
}


const rootReducer = combineReducers({
  auth: persistReducer(authConfig, authReducer),
  getConvId: messReducer
})

const persistedReducer = persistReducer(persitConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleWare) => getDefaultMiddleWare({
    serializableCheck: {
      ignoreActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
    }
  })
})

export let persistor = persistStore(store)