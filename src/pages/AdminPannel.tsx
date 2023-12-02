import React, { useEffect } from "react";
import AdminHeader from "../components/Admin/AdminHeader";
import { Outlet, useLocation } from "react-router-dom";
import StatisticsTop from "../components/Admin/StatisticsTop";
import { Helmet } from "react-helmet";
import DetectCurrentUserType from "../utils/detectUserType";
import { useTypedDispatch, useTypedSelector } from "../hooks/useTypedSelector";
import { getUserLoadsThunk, getUserTrucksThunk } from "../store/asyncThunk";
import { getUserType } from "../utils/helpers";

const AdminPannel = () => {
  const { pathname } = useLocation();
  const { user } = useTypedSelector((state) => state.user);
  const dispatch = useTypedDispatch();

  const currentUserType = getUserType()
  const userType= DetectCurrentUserType();

  useEffect(() => {
    if(userType == 'customer'){
      dispatch(getUserLoadsThunk({ userType: user.userType ? user.userType : currentUserType }));
    }else{
      dispatch(getUserTrucksThunk({ userType: user.userType ? user.userType : currentUserType }));
    }
   
  }, [userType]);


  return (
    <section className="w-full bg-red-600">
      <Helmet>
        <title>Իմ էջը</title>
      </Helmet>
      <div className=" mx-auto max-w-[2000px] bg-slate-100 dark:bg-slate-100 min-h-screen">  
        <AdminHeader />
        {!pathname.includes("/admin/settings") && <StatisticsTop />}
        <Outlet />
      </div>
    </section>
  );
};

export default AdminPannel;
