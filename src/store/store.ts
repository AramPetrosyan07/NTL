import { configureStore } from "@reduxjs/toolkit";
import { mapSLice } from "./mapSlice";
import customerSlice from "./customerSlice";
import loadSlice from './itemsSlice'
import truckSlice from "./truckSlice";
export const store = configureStore({
  reducer: {
    map: mapSLice.reducer,
    user: customerSlice,
    load : loadSlice,
    truck:truckSlice
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
