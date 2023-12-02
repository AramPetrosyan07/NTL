import { createSlice } from "@reduxjs/toolkit";
import { TypeFrom, TypeInitialState } from "./types";

const initialState: TypeInitialState = {
  from: {
    location: { lat: 40.1872023, lng: 44.515209 },
    description: "Ereván, Армения",
  } as TypeFrom,

  to: {
    location: { lat: 40.807399, lng: 44.4970268 },
    description: "Vanadzor, Армения",
  } as TypeFrom,
  travelTime: 0,
  selectedOption: "",
};

export const mapSLice = createSlice({
  name: "map",
  initialState,
  reducers: {
    setFrom: (state, action) => {
      state.from = action.payload;
    },
    setTo: (state, action) => {
      state.to = action.payload;
    },
    setTravelTime: (state, action) => {
      state.travelTime = action.payload;
    },
    setSelectedOption: (state, action) => {
      state.selectedOption = action.payload;
    },
  },
});
