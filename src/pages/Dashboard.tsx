import React, { useEffect, useLayoutEffect, useState } from "react";
import { Helmet } from "react-helmet";
import Header from "../components/Header";
import SortLoads from "../UI/UISort";
import { LuFilter, LuFilterX } from "react-icons/lu";
import DashboardFilter from "../components/DashboardFilter";
import { useTypedDispatch, useTypedSelector } from "../hooks/useTypedSelector";
import ItemTitle from "../components/ItemTitle";
import ItemDesktop from "../components/ItemDesktop";
import ItemMobile from "../components/ItemMobile";
import Loader from "../components/Loader";
import { allStatistic } from "../store/asyncThunk";

const Dashboard: React.FC = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const { load } = useTypedSelector((state) => state.load);
  const { user } = useTypedSelector((state) => state.user);
  const dispatch = useTypedDispatch();

  useEffect(() => {
    if (user.userType) {
      dispatch(allStatistic({ userType: user.userType }));
    }
  }, [user.userType]);

  useLayoutEffect(() => {
    if (!load.length) {
      setLoading(true);
      const timeoutId = setTimeout(() => {
        setLoading(false);
      }, 1800);
      return () => clearTimeout(timeoutId);
    }
  }, []);
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <section className="max-w-[2000px] h-screen mx-auto">
          <Helmet>
            <title>NTL | Բեռներ</title>
          </Helmet>
          <Header />

          <div className="w-full h-10 bg-[#eaeaea] flex items-center justify-between pl-4 pr-4 border-t-[1px] dark:border-t-0 dark:bg-[#0b1c2f] dark:text-white">
            <p className="text-[14px]">{load.length} գտնված բեռներ</p>
            <div className="h-full flex items-center gap-4 relative -z-1">
              <SortLoads />
              <div
                onClick={() => setOpen(!open)}
                className="cursor-pointer text-xl font-bold"
              >
                {open ? <LuFilterX /> : <LuFilter />}
              </div>
            </div>
          </div>
          <DashboardFilter open={open} />
          <ItemTitle boardType="load" />
          <ItemDesktop boardType="load" />
          <ItemMobile boardType="load" />
        </section>
      )}
    </>
  );
};

export default Dashboard;
