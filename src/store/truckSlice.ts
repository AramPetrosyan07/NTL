import { createSlice } from "@reduxjs/toolkit";
import {
  addNewItemThunk,
  addNewTruckThunk,
  deleteItemThunk,
  deleteTruckThunk,
  getTruckThunk,
  getUserTrucksThunk,
  updateNewItemThunk,
  updateNewTruckThunk,
} from "./asyncThunk";

let initialState: any = {
  truck: [
    // {
    //   id: "",
    //   age: "",
    //   date: "",
    //   truckType: "",
    //   loadType: "",
    //   pickup: "",
    //   delivery: "",
    //   distance: null,
    //   customerInfo: { companyName: "", email: "", phoneNumber: "" },
    //   subCustomerInfo: { email: "", phoneNumber: "" },
    //   length: null,
    //   weight: null,
    //   rate: null,
    //   status: "",
    //   commodity: "",
    //   comment: "",
    // },
  ],
  userTrucks: [
    // {
    //   id: "",
    //   age: "",
    //   date: "",
    //   truckType: "",
    //   loadType: "",
    //   pickup: "",
    //   delivery: "",
    //   distance: null,
    //   customerInfo: { companyName: "", email: "", phoneNumber: "" },
    //   subCustomerInfo: { email: "", phoneNumber: "" },
    //   length: null,
    //   weight: null,
    //   rate: null,
    //   status: "",
    //   commodity: "",
    //   comment: "",
    // },
  ],
  isLoadingTruck: true,
  isEmptyTruck: false,
};

const truckSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    removeUser: (state) => {
      state.truck = [
        {
          id: "",
          age: "",
          date: "",
          truckType: "",
          loadType: "",
          pickup: "",
          delivery: "",
          distance: null,
          carrierInfo: { companyName: "", email: "", phoneNumber: "" },
          subCarrierrInfo: { email: "", phoneNumber: "" },
          length: null,
          weight: null,
          rate: null,
          status: "",
          comment: "",
        },
      ];
      state.userTruck = [
        {
          id: "",
          age: "",
          date: "",
          truckType: "",
          loadType: "",
          pickup: "",
          delivery: "",
          distance: null,
          carrierInfo: { companyName: "", email: "", phoneNumber: "" },
          subCarrierInfo: { email: "", phoneNumber: "" },
          length: null,
          weight: null,
          rate: null,
          status: "",
          comment: "",
        },
      ];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getTruckThunk.fulfilled, (state, { payload }) => {
      state.truck = payload.data;
      if (payload.request.status === 200) {
        if (!payload.data?.length) {
          state.isEmptyTruck = true;
        }
        state.isLoadingTruck = false;
      } else {
        state.isLoadingTruck = true;
      }
    });
    builder.addCase(getUserTrucksThunk.fulfilled, (state, { payload }) => {
      state.userTrucks = payload.data;
    });
    builder.addCase(addNewTruckThunk.fulfilled, (state, { payload }) => {
      state.userTrucks.push(payload);
    });
    builder.addCase(updateNewTruckThunk.fulfilled, (state, { payload }) => {
      state.userTrucks = state.userTrucks.map((el: any) => {
        if (el._id === payload._id) {
          return payload;
        } else {
          return el;
        }
      });
    });
    builder.addCase(deleteTruckThunk.fulfilled, (state, { payload }) => {
      const deletedItemId = payload.id;
      state.userTrucks = state.userTrucks.filter(
        (el: any) => el._id !== deletedItemId
      );
    });
  },
});

export const { removeUser } = truckSlice.actions;

export default truckSlice.reducer;
