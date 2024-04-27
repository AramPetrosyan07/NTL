import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import "../../../styles/pieChartBox.scss";
import { useTypedSelector } from "../../../hooks/useTypedSelector";

const PieChartBox = (props: any) => {
  const { user } = useTypedSelector((state) => state.user);
  const data = [
    { name: "Բեռներ", value: props.open, color: "#0088FE" },
    { name: "Ճանապարհին", value: props.onRoad, color: "#00C49F" },
    { name: "Դատարկված", value: props.delivered, color: "#FFBB28" },
    { name: "Վճարված", value: props.paid, color: "#FF8042" },
  ];

  function CutString(inputString: string): string {
    if (inputString.length > 5) {
      return inputString.slice(0, 5);
    }
    return inputString;
  }
  return (
    <div className="pieChartBox">
      <h1>
        {user.userType === "customer" || user.userType === "subCustomer"
          ? "Բեռների վիճակագրություն"
          : "Բեռնատարների վիճակագրություն"}
      </h1>
      <div className="chart">
        <ResponsiveContainer width="99%" height={300}>
          <PieChart>
            <Tooltip
              contentStyle={{ background: "white", borderRadius: "5px" }}
            />
            <Pie
              data={data}
              innerRadius={"70%"}
              outerRadius={"90%"}
              paddingAngle={5}
              dataKey="value"
            >
              {data.map((item) => (
                <Cell key={item.name} fill={item.color} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="options">
        {data.map((item) => (
          <div className="option" key={item.name}>
            <div className="title">
              <div className="dot" style={{ backgroundColor: item.color }} />
              <span title={item.name}>{CutString(item.name)}</span>
            </div>
            <span>{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PieChartBox;
