import { createSlice } from "@reduxjs/toolkit";
import {
  addNewItemThunk,
  deleteItemThunk,
  getLoadThunk,
  getPreviewItem,
  getUserLoadsThunk,
  updateNewItemThunk,
} from "./asyncThunk";
//
interface ILoad {
  id?: string;
  age?: string;
  date?: string;
  truckType?: string;
  type?: string;
  pickup?: string;
  delivery?: string;
  distance?: number | null;
  customerInfo?: {
    companyName?: string;
    email?: string;
    phoneNumber?: string;
  };
  subCustomerInfo?: {
    email?: string;
    phoneNumber?: string;
  };
  length?: number | null;
  weight?: number | null;
  rate?: number | null;
  status?: string;
  commodity?: string;
  comment?: string;
}

enum SortType {
  updatedAt = "updatedAt",
  weight = "weight",
  rate = "rate",
}

interface ISort {
  type: SortType;
  direction: "up" | "down";
}

let initialState: any = {
  load: [
    // {
    //   id: "",
    //   age: "",
    //   date: "",
    //   truckType: "",
    //   type: "",
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
  ] as ILoad[],
  filteredLoads: [],
  userLoads: [
    // {
    //   id: "",
    //   age: "",
    //   date: "",
    //   truckType: "",
    //   type: "",
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
  isLoading: true,
  isEmpty: false,
  previewItem: {},
  message: "",
  sort: {
    type: "updatedAt",
    direction: "up",
  } as ISort,
};

const itemSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    openItemPreview: (state, action) => {
      const previewItem = state.load.find(
        (item: any) => item._id === action.payload
      );
      console.log(state.load);
      console.log(action.payload);
    },
    removeLoads: (state) => {
      state.load = [
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
      ];
      state.userLoad = [
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
      ];
    },
    updatePreviewItem: (state, { payload }) => {
      state.previewItem = payload;
    },
    loadInitialPosition: (state) => {
      state.filteredLoads = [];
    },
    filterLoad: (state, { payload }) => {
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

      state.filteredLoads = state.load.filter((item: any) => {
        if (
          (payload.date === "" ||
            item.date === changeDateFormat(payload.date)) &&
          (payload.delivery === "" ||
            item.delivery.description
              .toLowerCase()
              ?.includes(payload.delivery.toLowerCase())) &&
          (!payload.truckType || item.truckType === payload.truckType.name) && // Modified line
          (payload.pickUp === "" ||
            item.pickup.description
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
    sortLoad: (state, { payload }) => {
      const sortBy = (a: any, b: any) => {
        const directionFactor = state.sort.direction === "up" ? 1 : -1;
        let aValue, bValue;

        switch (payload.type) {
          case "updatedAt":
            aValue = new Date(a.updatedAt).getTime();
            bValue = new Date(b.updatedAt).getTime();
            break;
          case "weight":
          case "rate":
            aValue = a[payload.type];
            bValue = b[payload.type];
            break;
          default:
            return 0;
        }

        return (aValue - bValue) * directionFactor;
      };
      console.log(payload);

      state.load = state.load.toSorted(sortBy);
      state.sort = payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getLoadThunk.fulfilled, (state, { payload }) => {
      if (payload === "Բեռ չի գտնվել") {
        state.message = payload;
      } else {
        state.load = payload;
        if (!payload?.length) {
          state.isEmpty = true;
        }
        state.isLoading = false;
      }
    });
    builder.addCase(getLoadThunk.pending, (state, { payload }) => {
      state.isLoading = true;
    });
    builder.addCase(getUserLoadsThunk.fulfilled, (state, { payload }) => {
      state.userLoads = payload;
    });
    builder.addCase(addNewItemThunk.fulfilled, (state, { payload }) => {
      state.userLoads.push(payload);
    });
    builder.addCase(updateNewItemThunk.fulfilled, (state, { payload }) => {
      state.userLoads = state.userLoads.map((el: any) => {
        if (el._id === payload._id) {
          return payload;
        } else {
          return el;
        }
      });
    });
    builder.addCase(deleteItemThunk.fulfilled, (state, { payload }) => {
      const deletedItemId = payload.id;
      state.userLoads = state.userLoads.filter(
        (el: any) => el._id !== deletedItemId
      );
    });
    builder.addCase(getPreviewItem.fulfilled, (state, { payload }) => {
      state.previewItem = payload;
    });
  },
});

export const {
  removeLoads,
  openItemPreview,
  updatePreviewItem,
  loadInitialPosition,
  filterLoad,
  sortLoad,
} = itemSlice.actions;

export default itemSlice.reducer;
