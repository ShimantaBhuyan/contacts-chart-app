import moment from "moment/moment";
import { useQuery } from "@tanstack/react-query";
import LineChartComponent from "./line-chart";

const HistoricalDataChart = () => {
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
      <LineChartComponent
        key={"historicalCasesTimeSeriesChart"}
        data={casesLineGraphData}
        datesData={allCasesDates}
        lineColor="#8884d8"
        xKey="x"
        yKey="cases"
      />

      <h2 className="text-2xl font-bold mb-4">Deaths</h2>
      <LineChartComponent
        key={"historicalDeathsTimeSeriesChart"}
        data={deathsLineGraphData}
        datesData={allDeathsDates}
        lineColor="#e91313"
        xKey="x"
        yKey="deaths"
      />

      <h2 className="text-2xl font-bold mb-4">Recovered</h2>
      <LineChartComponent
        key={"historicalRecoveredTimeSeriesChart"}
        data={recoveredLineGraphData}
        datesData={allRecoveredDates}
        lineColor="#66e481"
        xKey="x"
        yKey="recovered"
      />
    </div>
  );
};

export default HistoricalDataChart;
