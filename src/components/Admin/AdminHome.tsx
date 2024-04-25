import BarChartBox from "./statistic/BarChartBox";
import BigChartBox from "./statistic/BigChartBox";
import ChartBox from "./statistic/ChartBox";
import PieChartBox from "./statistic/PieChartBox";
import TopBox from "./statistic/TopBox";
import {
  barChartBoxRevenue,
  barChartBoxVisit,
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
import { workersSalary } from "../../store/asyncThunk";

const Home = () => {
  const { user } = useTypedSelector((state) => state.user);
  const dispatch = useTypedDispatch();

  useEffect(() => {
    if (user.userType === "customer" || user.userType === "carrier") {
      dispatch(workersSalary());
    }
  }, []);

  return (
    <div className="home ">
      <div className="box box1">
        <TopBox />
      </div>
      <div className="box box2">
        <ChartBox {...chartBoxUser} />
      </div>
      <div className="box box3">
        <ChartBox {...chartBoxProduct} />
      </div>
      <div className="box box4">
        <PieChartBox />
      </div>
      <div className="box box5">
        <ChartBox {...chartBoxConversion} />
      </div>
      <div className="box box6">
        <ChartBox {...chartBoxRevenue} />
      </div>
      <div className="box box7">
        <BigChartBox />
      </div>
      <div className="box box8">
        <BarChartBox {...barChartBoxVisit} />
      </div>
      <div className="box box9">
        <BarChartBox {...barChartBoxRevenue} />
      </div>
    </div>
  );
};

export default Home;
