import { AnimatePresence, motion } from "framer-motion";
import { CutString, checkLengthOfValue } from "../utils/Check";
import { HiArrowRight } from "react-icons/hi";
import CallOptions from "./CallOptions";
import { Link } from "react-router-dom";

const Accordion = ({
  i,
  expanded,
  setExpanded,
  id,
  age,
  date,
  truckType,
  loadType,
  pickup,
  delivery,
  distance,
  company,
  contact,
  length,
  weight,
  rate,
  commodity,
  comment,
  boardType,
}: any) => {
  const isOpen = i === expanded;
  return (
    <>
      <motion.div
        initial={false}
        className={`${isOpen ? "bg-slate-300" : "bg-slate-200"} `}
        onClick={() => setExpanded(isOpen ? false : i)}
      >
        <div className="max-w-[2000px] lg:flex hidden">
          <div className="w-full h-[32px] bg-slate-200 dark:bg-slate-700 dark:text-slate-200  text-[13px]  flex justify-around gap-[1px] font-[400]">
            <div className="flex justify-start items-center pl-[6px] w-[50px]">
              <div>{age}</div>
            </div>
            <div className=" flex justify-start items-center pl-[6px] w-[50px]">
              <div>{date}</div>
            </div>
            <div className="flex justify-start items-center pl-[6px] w-[50px]">
              <div>{truckType}</div>
            </div>
            <div className=" flex justify-start items-center pl-[6px] w-[40px]">
              <div title={loadType}>{loadType[0].toUpperCase()}</div>
            </div>

            <div className="flex justify-start items-center pl-[6px] w-[150px]">
              <div title={pickup}>{CutString(pickup)}</div>
            </div>
            <div className=" flex justify-start items-center pl-[6px] w-[35px]">
              <div>
                <HiArrowRight />
              </div>
            </div>
            <div className=" flex justify-start items-center pl-[6px] w-[150px]">
              <div title={delivery}>{CutString(delivery)}</div>
            </div>
            <div className=" flex justify-start items-center pl-[6px] w-[70px]">
              <div>{distance} կմ</div>
            </div>
            <div className=" flex justify-start items-center pl-[6px] w-[160px] text-[#1C90F3]">
              <div title={company}>{CutString(company)}</div>
            </div>
            <div className=" flex justify-start items-center pl-[6px] w-[140px]">
              <div
                className="cursor-pointer text-[13px]"
                onClick={(e) => {
                  e.stopPropagation();
                }}
              >
                <CallOptions contact={contact} />
              </div>
            </div>
            <div className=" flex justify-start items-center pl-[6px] w-[50px]">
              <div>{checkLengthOfValue(length, "մ³")} </div>
            </div>
            <div className=" flex justify-start items-center pl-[6px] w-[80px]">
              <div>{checkLengthOfValue(weight, "կգ")} </div>
            </div>
            <div className="flex justify-start items-center pl-[6px] w-[70px]">
              <div className="text-[#1C90F3]">{checkLengthOfValue(rate, "$")}</div>
            </div>
            {boardType === "load" && (
              <div className="flex justify-start items-center  w-[70px]">
                <Link
                  to={`/dashboard/preview/${id}`}
                  target="_blank"
                  type="button"
                  className=" font-light text-gray-900 bg-slate-300 dark:bg-[#1e3053] dark:text-white focus:outline-none hover:bg-slate-200 hover:border-[0.2px] hover:shadow hover:border-blue-400  focus:ring-0  rounded-xl text-[11px] px-[13px] py-[3px]  flex justify-center items-center transition-all"
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                >
                  Քարտեզ
                </Link>
              </div>
            )}
          </div>
        </div>
      </motion.div>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.section
            key="content"
            initial="collapsed"
            animate="open"
            exit="collapsed"
            variants={{
              open: { opacity: 1, height: "auto" },
              collapsed: { opacity: 0, height: 0 },
            }}
            transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
          >
            <motion.div
              variants={{ collapsed: { scale: 0.8 }, open: { scale: 1 } }}
              transition={{ duration: 0.2 }}
              className="content-placeholder bg-inherit lg:block hidden"
            >
              <div className="w-full h-[60px] flex justify-between items-center text-[12px] gap-4 dark:text-gray-100">
                {boardType === "load" && (
                  <div className="commodity w-[400px] h-full  flex items-center p-2 rounded-xl font-bold">
                    Բեռը : <p className="font-normal pl-2">{commodity}</p>
                  </div>
                )}

                <div
                  className={`comment1  w-full h-full flex items-center ${
                    boardType === "load" && "justify-center"
                  }  p-2  font-bold`}
                >
                  Հավելյալ ինֆորմացիա :{" "}
                  <p className="font-normal pl-2">{comment}</p>
                </div>
                {boardType === "load" && (
                  <div className="info w-[400px] h-full  flex items-center p-2  font-bold">
                    Վճարում : <p className="font-normal pl-2"></p>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.section>
        )}
      </AnimatePresence>
    </>
  );
};

export default Accordion;
