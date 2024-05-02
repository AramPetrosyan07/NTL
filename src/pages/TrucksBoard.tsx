import React, { useLayoutEffect, useState } from "react";
import { Helmet } from "react-helmet";
import Header from "../components/Header";
import SortLoads from "../UI/UISort";
import { LuFilter, LuFilterX } from "react-icons/lu";
import DashboardFilter from "../components/DashboardFilter";
import { useTypedSelector } from "../hooks/useTypedSelector";
import Loader from "../components/Loader";
import ItemTitle from "../components/ItemTitle";
import ItemDesktop from "../components/ItemDesktop";
import ItemMobile from "../components/ItemMobile";

const TrucksBoard: React.FC = () => {
  const [open, setOpen] = useState<boolean>(false);
  const { truck } = useTypedSelector((state) => state.truck);
  const [loading, setLoading] = useState<boolean>(false);

  useLayoutEffect(() => {
    if (!truck.length) {
      setLoading(true);
      const timeoutId = setTimeout(() => {
        setLoading(false);
      }, 1800);
      return () => clearTimeout(timeoutId);
    }
  }, []);
  console.log(loading);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <section className="max-w-[2000px] h-screen mx-auto">
          <Helmet>
            <title>NTL | Բեռնատարներ</title>
          </Helmet>
          <Header />
          <div className="w-full h-10 bg-[#eaeaea] flex items-center justify-between pl-4 pr-4 border-t-[1px] dark:border-t-0 dark:bg-[#0b1c2f] dark:text-white">
            <p className="text-[14px]">{truck.length} գտնված բեռնատարներ</p>
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
          <ItemTitle boardType="truck" />
          <ItemDesktop boardType="truck" />
          <ItemMobile boardType="truck" />
        </section>
      )}
    </>
  );
};

export default TrucksBoard;
