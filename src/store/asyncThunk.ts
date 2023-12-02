import { createAsyncThunk } from "@reduxjs/toolkit";

import axios from "../axios";
import {
  getTokens,
  getUserType,
  recoverToken,
  recoverVerifyToken,
  saveToken,
  saveUserType,
} from "../utils/helpers";

export const registerThunk = createAsyncThunk<any, any>(
  "customerSlice/registerThunk",
  async (data) => {
    const res = await axios.post(`auth/register`, data);

    const token = await res.data.token;
    const userType = await res.data.userType;
    if (token) {
      saveToken(token);
      saveUserType(userType);
    }
    return res.data;
  }
);
export const registerSubUserThunk = createAsyncThunk<any, any>(
  "customerSlice/registerSubUserThunk",
  async (data) => {
    const getCurrentUserTypeViaCookie = getUserType();

    const mixedData = {
      ...data,
      currentUserType: getCurrentUserTypeViaCookie,
    };

    const res = await axios.post(`auth/registerSub`, mixedData);
    return res.data;
  }
);
export const loginThunk = createAsyncThunk<any, any>(
  "customerSlice/loginThunk",
  async (data) => {
    const res = await axios.post(`auth/login`, data);
    const token = await res.data.token;
    const userType = await res.data.userType;
    if (token) {
      saveToken(token);
      saveUserType(userType);
    }
    return res.data;
  }
);

export const authMe = createAsyncThunk<any>(
  "customerSlice/authMe",
  async () => {
    const currentUserType = getUserType();
    const res = await axios.post(`auth/me`, { userType: currentUserType });

    const token = await res.data.token;

    if (token) {
      saveToken(token);
      saveUserType(currentUserType);
    }
    return res.data;
  }
);

export const recoverSend = createAsyncThunk<any, any>(
  "customerSlice/recoverSend",
  async (data, { rejectWithValue }) => {
    const res = await axios.post(`recover/send`, data);
    const token = await res.data.token;

    if (token) {
      recoverToken(token);
    } else {
      return res;
    }
  }
);

export const recoverResponse = createAsyncThunk<any>(
  "customerSlice/recoverResponse",
  async (data) => {
    const res = await axios.post(`recover/response`, data);
    const verifyToken = await res.data.verifyToken;

    if (verifyToken) {
      recoverVerifyToken(verifyToken);
    }
  }
);

export const recoverPassRecovery = createAsyncThunk<any>(
  "customerSlice/recoverPassRecovery",
  async (data: any) => {
    let tokens = getTokens();
    if (!tokens) {
      return;
    }
    let newData = {
      token: tokens.token,
      verifyToken: tokens.verifyToken,
      ...data,
    };
    const res = await axios.post(`recover/PassRecovery`, newData);
    const token = await res.data.token;
    if (token) {
      saveToken(token);
    }
    return res.data;
  }
);

export const addNewItemThunk = createAsyncThunk<any, any>(
  "itemSlice/addNewItemThunk",
  async (data: any) => {
    const res = await axios.post(`load/add`, data);

    return res.data;
  }
);
export const addNewTruckThunk = createAsyncThunk<any, any>(
  "truckSlice/addNewTruckThunk",
  async (data: any) => {
    const res = await axios.post(`truck/add`, data);

    return res.data;
  }
);
export const updateNewItemThunk = createAsyncThunk<any, any>(
  "itemSlice/updateNewItemThunk",
  async (data) => {
    const res = await axios.post(`load/updateLoad`, data);

    return res.data;
  }
);
export const deleteItemThunk = createAsyncThunk<any, any>(
  "itemSlice/deleteItemThunk",
  async (data) => {
    const res = await axios.post(`load/deleteLoad`, data);

    return res.data;
  }
);

export const getLoadThunk = createAsyncThunk<any>(
  "itemSlice/getLoadThunk",
  async () => {
    const res = await axios.get(`load/get`);
    return res;
  }
);
export const getUserLoadsThunk = createAsyncThunk<any, any>(
  "itemSlice/getUserLoadsThunk",
  async (data) => {
    const res = await axios.post(`load/getUserLoads`, data);
    return res;
  }
);
export const getTruckThunk = createAsyncThunk<any>(
  "truckSlice/getTruckThunk",
  async () => {
    const res = await axios.get(`truck/get`);
    return res;
  }
);

export const getUserTrucksThunk = createAsyncThunk<any, any>(
  "truckSlice/getUserTrucksThunk",
  async (data) => {
    const res = await axios.post(`truck/getUserTrucks`, data);
    return res;
  }
);

export const updateNewTruckThunk = createAsyncThunk<any, any>(
  "truckSlice/updateNewTruckThunk",
  async (data) => {
    const res = await axios.post(`truck/updateTruck`, data);

    return res.data;
  }
);

export const deleteTruckThunk = createAsyncThunk<any, any>(
  "truckSlice/deleteTruckThunk",
  async (data) => {
    const res = await axios.post(`truck/deleteTruck`, data);
    console.log(res)
    return res.data;
  }
);

export const getPreviewItem = createAsyncThunk<any, any>(
  "itemsSlice/getPreviewItem",
  async (data) => {
    const res = await axios.post(`load/getDetail`, data);
    console.log(res)
    return res.data;
  }
);
