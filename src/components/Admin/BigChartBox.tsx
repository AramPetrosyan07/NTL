import {
    Area,
    AreaChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
  } from "recharts";
  import "../../styles/bigChartBox.scss";
  
  const data = [
    {
      name: "Կիր",
      books: 4000,
      clothes: 2400,
      electronic: 2400,
    },
    {
      name: "Երկ",
      books: 3000,
      clothes: 1398,
      electronic: 2210,
    },
    {
      name: "Երք",
      books: 2000,
      clothes: 9800,
      electronic: 2290,
    },
    {
      name: "Չոր",
      books: 2780,
      clothes: 3908,
      electronic: 2000,
    },
    {
      name: "Հնգ",
      books: 1890,
      clothes: 4800,
      electronic: 2181,
    },
    {
      name: "Ուրբ",
      books: 2390,
      clothes: 3800,
      electronic: 2500,
    },
    {
      name: "Շաբ",
      books: 3490,
      clothes: 4300,
      electronic: 2100,
    },
  ];
  
  const BigChartBox = () => {

    return (
      <div className="bigChartBox">
        <h1>Բեռնափոխադրումների վերլուծություն</h1>
        <div className="chart">
          <ResponsiveContainer width="99%" height="100%">
            <AreaChart
              data={data}
              margin={{
                top: 10,
                right: 30,
                left: 0,
                bottom: 0,
              }}
            >
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="electronic"
                stackId="1"
                stroke="#8884d8"
                fill="#8884d8"
              />
              <Area
                type="monotone"
                dataKey="clothes"
                stackId="1"
                stroke="#82ca9d"
                fill="#82ca9d"
              />
              <Area
                type="monotone"
                dataKey="books"
                stackId="1"
                stroke="#ffc658"
                fill="#ffc658"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    );
  };
  
  export default BigChartBox;