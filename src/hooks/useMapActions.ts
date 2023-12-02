import { bindActionCreators } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { mapSLice } from "../store/mapSlice";

export const useMapActions = () => {
  const dispatch = useDispatch();

  return bindActionCreators(mapSLice.actions, dispatch);
};
