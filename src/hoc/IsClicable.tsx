import React from "react";
import { Link } from "react-router-dom";

const IsClicable = ({ isClicable, children, id }: any) => {
  if (isClicable) {
    return (
      <Link
        to={`/dashboard/preview/${id}`}
        className="relative pb-40  lg:hidden flex bg-slate-200 dark:bg-[#0E192D] dark:text-slate-200  border-b-4 border-stone-50 sm:px-4 px-4 text-[0.9rem] md:text-[1.2rem] font-bold"
        target="_blank"
      >
        {children}
      </Link>
    );
  } else {
    return <div  className="relative pb-8 lg:hidden flex bg-slate-200 dark:bg-[#0E192D] dark:text-slate-200  border-b-4 border-stone-50 sm:px-4 px-4 text-[0.9rem] md:text-[1.2rem] font-bold">{children}</div>;
  }
};

export default IsClicable;
