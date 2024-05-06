import { createSlice } from "@reduxjs/toolkit";
import {
  addNewTruckThunk,
  deleteTruckThunk,
  // getCarrierSubs,
  getTruckThunk,
  getUserTrucksThunk,
  updateNewTruckThunk,
} from "./asyncThunk";

let initialState: any = {
  truck: [
    {
      id: "",
      age: "",
      date: "",
      truckType: "",
      type: "",
      pickup: "",
      delivery: "",
      distance: null,
      customerInfo: { companyName: "", email: "", phoneNumber: "" },
      subCustomerInfo: { email: "", phoneNumber: "" },
      length: null,
      weight: null,
      rate: null,
      status: "",
      commodity: "",
      comment: "",
    },
  ],
  filteredTrucks: [],
  userTrucks: [
    {
      id: "",
      age: "",
      date: "",
      truckType: "",
      type: "",
      pickup: "",
      delivery: "",
      distance: null,
      customerInfo: { companyName: "", email: "", phoneNumber: "" },
      subCustomerInfo: { email: "", phoneNumber: "" },
      length: null,
      weight: null,
      rate: null,
      status: "",
      commodity: "",
      comment: "",
    },
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
          type: "",
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
      state.filteredTrucks = [];
      state.userTruck = [
        {
          id: "",
          age: "",
          date: "",
          truckType: "",
          type: "",
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
    truckInitialPosition: (state) => {
      // state.filteredLoads = [];
      state.filteredTrucks = [];
    },

    filterTruck: (state, { payload }) => {
      const changeDateFormat = (date: string): string => {
        if (date === "") {
          return "";
        }
        let inputDate = new Date(date);
        inputDate.setMinutes(
          inputDate.getMinutes() - inputDate.getTimezoneOffset()
        );
        return inputDate.toISOString().split("T")[0];
      };

      state.filteredTrucks = state.truck.filter((item: any) => {
        if (
          (payload.date === "" ||
            item.date === changeDateFormat(payload.date)) &&
          (payload.delivery === "" ||
            item?.delivery?.description
              .toLowerCase()
              ?.includes(payload.delivery.toLowerCase())) &&
          (!payload.truckType || item.truckType === payload.truckType.name) && // Modified line
          (payload.pickUp === "" ||
            item?.pickup?.description
              .toLowerCase()
              ?.includes(payload.pickUp.toLowerCase())) &&
          (!payload.type || item.type === payload.type.name) && // Modified line
          (payload.length === "" || item.length === +payload.length) &&
          (payload.weight === "" || item.weight === +payload.weight) &&
          (payload.rate === "" || item.rate === +payload.rate)
        ) {
          return item;
        }
      });
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getTruckThunk.fulfilled, (state, { payload }) => {
      state.truck = payload;
      if (!payload?.length) {
        state.isEmptyTruck = true;
      }
      // state.isLoadingTruck = false;
    });

    builder.addCase(getUserTrucksThunk.fulfilled, (state, { payload }) => {
      state.userTrucks = payload;
    });
    // builder.addCase(getCarrierSubs.fulfilled, (state, { payload }) => {
    //   state.userTrucks = payload;
    // });
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

export const { removeUser, filterTruck, truckInitialPosition } =
  truckSlice.actions;

export default truckSlice.reducer;
