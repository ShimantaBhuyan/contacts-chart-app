import { scaleTime } from "d3-scale";
import moment from "moment/moment";
import { useQuery } from "@tanstack/react-query";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
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

const LineChartComponent = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["historicalData"],
    staleTime: 600000,
    queryFn: () =>
      fetch("https://disease.sh/v3/covid-19/historical/all?lastdays=all").then(
        (res) => res.json()
      ),
  });

  if (isLoading) {
    return <div className="min-h-[510px]">Loading...</div>;
  }

  if (isError) {
    return <div>Error fetching data</div>;
  }

  const casesLineData = Object.entries(data.cases).map((d: any) => {
    return {
      x: Object.entries(d)[0][1],
      cases: Object.entries(d)[1][1],
    };
  });

  const casesLineGraphData = casesLineData.map((point) => ({
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    x: moment(point.x).valueOf(),
    cases: point.cases,
  }));

  const allCasesDates = casesLineGraphData.map(
    (point) => point.x + "T00:00:00.000Z"
  );

  const deathsKeys = Object.keys(data.deaths).sort((a, b) => {
    return moment(a).valueOf() - moment(b).valueOf();
  });

  const sortedDeaths = {} as any;
  deathsKeys.forEach((key) => {
    sortedDeaths[key] = data.deaths[key];
  });

  const deathsLineData = Object.entries(sortedDeaths).map((d: any) => {
    return {
      x: Object.entries(d)[0][1],
      deaths: Object.entries(d)[1][1],
    };
  });

  console.log({ deathsLineData });

  const deathsLineGraphData = deathsLineData.map((point) => ({
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    x: moment(point.x).valueOf(),
    deaths: point.deaths,
  }));

  const allDeathsDates = deathsLineGraphData.map(
    (point) => point.x + "T00:00:00.000Z"
  );

  const recoveredKeys = Object.keys(data.deaths).sort((a, b) => {
    return moment(a).valueOf() - moment(b).valueOf();
  });

  const sortedRecovered = {} as any;
  recoveredKeys.forEach((key) => {
    sortedRecovered[key] = data.recovered[key];
  });

  const recoveredLineData = Object.entries(sortedRecovered).map((d: any) => {
    return {
      x: Object.entries(d)[0][1],
      recovered: Object.entries(d)[1][1],
    };
  });

  const recoveredLineGraphData = recoveredLineData.map((point) => ({
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    x: moment(point.x).valueOf(),
    recovered: point.recovered,
  }));

  const allRecoveredDates = recoveredLineGraphData.map(
    (point) => point.x + "T00:00:00.000Z"
  );

  return (
    <div className="w-full flex flex-col justify-center gap-10 p-4">
      <h2 className="text-2xl font-bold mb-4">Historical COVID-19 Data</h2>

      <h2 className="text-2xl font-bold mb-4">Cases</h2>
      <LineChart
        width={900}
        height={300}
        data={casesLineGraphData}
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
          // dot={true}
          // activeDot={true}
          stroke="#333"
          dataKey="x"
          fontSize={12}
          dy={10}
          tickLine={false}
          {...getXAxisArgsForTimeBasedGraph(allCasesDates)}
        />
        <YAxis fontSize={12} padding={{ top: 0, bottom: 0 }} scale={"linear"} />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="cases" stroke={"#8884d8"} />
      </LineChart>

      <h2 className="text-2xl font-bold mb-4">Deaths</h2>
      <LineChart
        width={900}
        height={300}
        data={deathsLineGraphData}
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
          // dot={true}
          // activeDot={true}
          stroke="#333"
          dataKey="x"
          fontSize={12}
          dy={10}
          tickLine={false}
          {...getXAxisArgsForTimeBasedGraph(allDeathsDates)}
        />
        <YAxis fontSize={12} padding={{ top: 0, bottom: 0 }} scale={"linear"} />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="deaths" stroke={"#e91313"} />
      </LineChart>

      <h2 className="text-2xl font-bold mb-4">Recovered</h2>
      <LineChart
        width={900}
        height={300}
        data={recoveredLineGraphData}
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
          // dot={true}
          // activeDot={true}
          stroke="#333"
          dataKey="x"
          fontSize={12}
          dy={10}
          tickLine={false}
          {...getXAxisArgsForTimeBasedGraph(allRecoveredDates)}
        />
        <YAxis fontSize={12} padding={{ top: 0, bottom: 0 }} scale={"linear"} />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="recovered" stroke={"#8884d8"} />
      </LineChart>
    </div>
  );
};

export default LineChartComponent;
