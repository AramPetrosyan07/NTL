import { createSlice } from "@reduxjs/toolkit";
import {
  registerThunk,
  loginThunk,
  authMe,
  recoverPassRecovery,
} from "./asyncThunk";
import { LogOutUser } from "../utils/helpers";

let initialState: any = {
  user: {
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    userType: "",
    companyName: "",
    subCustomers: "",
    address: "",
    website: "",
    paymentType: "",
    paymentDuration: null,
    about: "",
    planType: "",
    notification: null,
    isVerified: false,
    failedLoginAttempts: null,
    lockoutUntil: null,
  },
};

const customerSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    removeUser: (state) => {
      LogOutUser();
      state.user = {
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        userType: "",
        companyName: "",
        subCustomers: "",
        address: "",
        website: "",
        paymentType: "",
        paymentDuration: null,
        about: "",
        planType: "",
        notification: null,
        isVerified: false,
        failedLoginAttempts: null,
        lockoutUntil: null,
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerThunk.fulfilled, (state, { payload }) => {
        state.user = payload;
      })
      .addCase(recoverPassRecovery.fulfilled, (state, { payload }) => {
        state.user = payload;
      })
      .addCase(loginThunk.fulfilled, (state, { payload }) => {
        console.log("payload");
        console.log(payload);
        state.user = payload;
      })
      .addCase(authMe.fulfilled, (state, { payload }) => {
        state.user = payload;
      });
  },
});

export const { removeUser } = customerSlice.actions;

export default customerSlice.reducer;
