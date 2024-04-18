import { createSlice } from "@reduxjs/toolkit";
import {
  registerThunk,
  loginThunk,
  authMe,
  getCustomerSubs,
  removeCustomerSubs,
  updateUser,
  passRecovery,
  changeEmail,
} from "./asyncThunk";
import { LogOutUser } from "../utils/helpers";

// export interface UserData {
//   user: {
//     firstName?: string;
//     lastName?: string;
//     email?: string;
//     phoneNumber?: string;
//     userType?: string;
//     companyName?: string;
//     subCustomers?: string;
//     address?: string;
//     website?: string;
//     paymentType?: string;
//     paymentDuration?: number | null;
//     about?: string;
//     planType?: string;
//     notification?: any;
//     isVerified?: boolean;
//     failedLoginAttempts?: number | null;
//     lockoutUntil?: Date | null;
//     parent: string;
//   };
//   userSubs: any;
// }

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
    parent: "",
  },
  userSubs: [],
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
        parent: "",
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerThunk.fulfilled, (state, { payload }) => {
        state.user = payload;
      })
      .addCase(passRecovery.fulfilled, (state, { payload }) => {
        state.user = payload;
      })
      .addCase(loginThunk.fulfilled, (state, { payload }) => {
        console.log("payload");
        console.log(payload);
        state.user = payload;
      })
      .addCase(authMe.fulfilled, (state, { payload }) => {
        state.user = payload;
      })
      .addCase(getCustomerSubs.fulfilled, (state, { payload }) => {
        state.userSubs = payload;
      })
      .addCase(removeCustomerSubs.fulfilled, (state, { payload }) => {
        state.userSubs.subCustomers = state.userSubs.subCustomers.filter(
          (item: any) => item._id !== payload
        );
      })
      .addCase(updateUser.fulfilled, (state, { payload }) => {
        if (typeof payload !== "string") {
          for (let key in payload) {
            state.user[key] = payload[key];
          }
        }
      })
      .addCase(changeEmail.fulfilled, (state, { payload }) => {
        state.user = payload;
      });
  },
});

export const { removeUser } = customerSlice.actions;

export default customerSlice.reducer;
