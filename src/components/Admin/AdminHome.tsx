import ChartBox from "./statistic/ChartBox";
import PieChartBox from "./statistic/PieChartBox";
import TopBox from "./statistic/TopBox";
import {
  chartBoxConversion,
  chartBoxProduct,
  chartBoxRevenue,
  chartBoxUser,
} from "../../data/data";

import "../../styles/home.scss";
import {
  useTypedDispatch,
  useTypedSelector,
} from "../../hooks/useTypedSelector";
import { useEffect } from "react";
import { allStatistic } from "../../store/asyncThunk";
import { chartBoxGen } from "../../utils/Tools";
// import { chartBoxGen } from "../../utils/Tools";

const Home = () => {
  const { user, statistic, statLoading } = useTypedSelector(
    (state) => state.user
  );
  const dispatch = useTypedDispatch();

  console.log("up useeffect");

  useEffect(() => {
    if (user.userType) {
      dispatch(allStatistic({ userType: user.userType }));
    }
  }, [user.userType]);

  const percent = (now: number, prev: number) => {
    if (prev === 0) {
      return now * 100;
    } else {
      return ((now - prev) / prev) * 100;
    }
  };

  // console.log(
  //   chartBoxGen({
  //     color: "#8884d8",
  //     title: "Աշխատակիցներ",
  //     number: statistic?.user?.at(-1)?.users,
  //     dataKey: "users",
  //     percentage: percent(
  //       statistic?.user?.at(-1)?.users as number,
  //       statistic?.user?.at(0)?.users as number
  //     ),
  //     chartData: statistic.user,
  //   })
  // );

  // console.log(statistic?.user?.at(-1));

  return (
    <>
      {statLoading ? (
        <div>loading</div>
      ) : (
        <div className="home ">
          <div className="box box1">
            <TopBox workers={statistic.workers} />
          </div>
          <div className="box box2">
            <ChartBox
              {...chartBoxGen({
                color: "#8884d8",
                title: "Աշխատակիցներ",
                number: statistic?.user?.at(-1)?.users,
                dataKey: "users",
                percentage: percent(
                  statistic?.user?.at(-1)?.users as number,
                  statistic?.user?.at(0)?.users as number
                ),
                chartData: statistic?.user,
              })}
            />
          </div>
          <div className="box box3">
            <ChartBox
              {...chartBoxGen({
                color: "skyblue",
                title: "Վաճառված բեռներ",
                number: statistic?.loadCount?.at(-1).loadCount,
                dataKey: "loadCount",
                percentage: percent(
                  statistic?.loadCount?.at(-1).loadCount as number,
                  statistic?.loadCount?.at(0).loadCount as number
                ),
                chartData: statistic.loadCount,
              })}
            />
          </div>
          <div className="box box4">
            <PieChartBox {...statistic?.loadStatistic} />
          </div>
          <div className="box box5">
            <ChartBox
              {...chartBoxGen({
                color: "gold",
                title: "Ընդհանուր բեռներ գինը",
                number: `${statistic?.loadPrice?.at(-1).rate}$`,
                dataKey: "rate",
                percentage: "",
                chartData: statistic.loadPrice,
              })}
            />
          </div>
          <div className="box box6">
            <ChartBox
              {...chartBoxGen({
                color: "teal",
                title: "Եկամուտ",
                number: `${statistic?.income?.at(-1).rate}$`,
                dataKey: "rate",
                percentage: "",
                chartData: statistic.income,
              })}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Home;
