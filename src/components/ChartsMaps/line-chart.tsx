import { scaleTime } from "d3-scale";
import moment from "moment/moment";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const monthFormat = (date: Date) => {
  return moment(date).format("D MMM YYYY");
};

const convertDateStringToTimeValue = (dateString: string): number => {
  return moment(dateString).valueOf();
};

const getXAxisArgsForTimeBasedGraph = (
  dateStrings: string[]
): {
  domain: any[];
  scale: any;
  xAxisType: string;
  ticks: any[];
  tickFormatter: (val: any) => string;
} => {
  if (!dateStrings.length) {
    return {} as any;
  }
  // The d3 scaleTime domain requires numeric values
  const numericValues = dateStrings.map((dateString) =>
    convertDateStringToTimeValue(dateString)
  );
  const maxValue = Math.max(...numericValues);
  const minValue = Math.min(...numericValues);

  // With .nice() we extend the domain nicely.
  const timeScale = scaleTime().domain([minValue, maxValue]).nice();

  const ticks = timeScale.ticks(5);

  return {
    domain: timeScale.domain().map((date) => date.valueOf()),
    scale: timeScale,
    xAxisType: "number",
    ticks: ticks,
    tickFormatter: monthFormat,
  };
};

const LineChartComponent = ({
  data,
  datesData,
  yKey,
  xKey,
  lineColor,
}: {
  data: any;
  datesData: any;
  yKey: string;
  xKey: string;
  lineColor: string;
}) => {
  return (
    <LineChart
      width={900}
      height={300}
      data={data}
      margin={{
        top: 5,
        right: 30,
        left: 20,
        bottom: 5,
      }}
      className="w-[100%] self-center"
    >
      <CartesianGrid strokeDasharray="2 5" />
      <XAxis
        axisLine={false}
        stroke="#333"
        dataKey={xKey}
        fontSize={12}
        dy={10}
        tickLine={false}
        {...getXAxisArgsForTimeBasedGraph(datesData)}
      />
      <YAxis fontSize={12} padding={{ top: 0, bottom: 0 }} scale={"linear"} />
      <Tooltip />
      <Legend />
      <Line type="monotone" dataKey={yKey} stroke={lineColor} />
    </LineChart>
  );
};

export default LineChartComponent;
