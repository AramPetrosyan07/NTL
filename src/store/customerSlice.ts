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
  allStatistic,
  getNotification,
  openNotification,
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
  statistic: {
    workers: [
      {
        username: "",
        email: "",
        amount: 0,
        amountPerMonth: 0,
      },
    ],
    user: [
      {
        users: 0,
      },
      {
        users: 0,
      },
      {
        users: 0,
      },
      {
        users: 0,
      },
    ],
    loadCount: [
      {
        loadCount: 0,
      },
      {
        loadCount: 0,
      },
      {
        loadCount: 0,
      },
      {
        loadCount: 0,
      },
    ],
    loadPrice: [
      {
        rate: 0,
      },
      {
        rate: 0,
      },
      {
        rate: 0,
      },
      {
        rate: 0,
      },
    ],
    income: [
      {
        rate: 0,
      },
      {
        rate: 0,
      },
      {
        rate: 0,
      },
      {
        rate: 0,
      },
    ],
    loadStatistic: {
      open: 1,
      onRoad: 1,
      delivered: 1,
      paid: 1,
    },
  },
  statLoading: true,
  notifications: [],
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
    openNotificationReducer: (state, action) => {
      const { id, pin } = action.payload;
      state.notifications = state.notifications.map((notification: any) => {
        if (notification._id === id) {
          return { ...notification, opened: true };
        }
        return notification;
      });
    },
    pinNotificationReducer: (state, action) => {
      const { id, pin } = action.payload;
      let update = state.notifications.map((notification: any) => {
        if (notification._id === id) {
          return { ...notification, pin: !pin };
        }
        return notification;
      });

      let pined = update.filter((item: any) => item.pin);
      let unpin = update.filter((item: any) => !item.pin);

      state.notifications = [...pined, ...unpin];
    },

    deleteNotificationReducer: (state, action) => {
      const { id } = action.payload;
      state.notifications = state.notifications.filter((item: any) => {
        if (item._id !== id) {
          return item;
        }
      });
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
      })
      .addCase(allStatistic.fulfilled, (state, { payload }) => {
        state.statistic = payload;
        state.statLoading = false;
      })
      .addCase(getNotification.fulfilled, (state, { payload }) => {
        let pin = payload.filter((item: any) => item.pin);
        let unpin = payload.filter((item: any) => !item.pin);

        state.notifications = [...pin, ...unpin];
      });
  },
});

export const {
  removeUser,
  openNotificationReducer,
  pinNotificationReducer,
  deleteNotificationReducer,
} = customerSlice.actions;

export default customerSlice.reducer;
