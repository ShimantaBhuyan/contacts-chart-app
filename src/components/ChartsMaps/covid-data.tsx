import { useQuery } from "@tanstack/react-query";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import moment from "moment";

const CovidData = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["covidData"],
    staleTime: 600000,
    queryFn: () =>
      fetch("https://disease.sh/v3/covid-19/all").then((res) => res.json()),
  });

  if (isLoading) {
    return <div className=" min-h-[551px]">Loading...</div>;
  }

  if (isError) {
    return <div>Error fetching data</div>;
  }

  const barChartData = [
    {
      value: data.casesPerOneMillion,
      name: "Cases/million",
    },
    {
      value: data.recoveredPerOneMillion,
      name: "Recovered/million",
    },
    {
      value: data.activePerOneMillion,
      name: "Active/million",
    },
    {
      value: data.deathsPerOneMillion,
      name: "Deaths/million",
    },
    {
      value: data.criticalPerOneMillion,
      name: "Critical/million",
    },
  ];

  console.log({ barChartData });

  return (
    <div className="flex flex-col justify-center p-4 gap-10">
      <h2 className="text-2xl font-bold mb-4">
        Worldwide COVID-19 Data{" "}
        <span className="text-sm font-medium">
          {"("}as of {moment(data.updated).format("MMMM Do YYYY, h:mm:ss a")}
          {")"}
        </span>
      </h2>
      <div className="flex flex-wrap gap-4 w-full">
        <p className="text-sm border border-dashed border-gray-600 p-4 rounded-md">
          Total Population:{" "}
          <span className="text-[#79d17d] font-medium">{data?.population}</span>
        </p>
        <p className="text-sm border border-dashed border-gray-600 p-4 rounded-md">
          Affected Countries:{" "}
          <span className="text-[#4b4d0c] font-medium">
            {data?.affectedCountries}
          </span>
        </p>
        <p className="text-sm border border-dashed border-gray-600 p-4 rounded-md">
          Total cases:{" "}
          <span className="text-[#9673b9] font-medium">{data?.cases}</span>
        </p>
        <p className="text-sm border border-dashed border-gray-600 p-4 rounded-md">
          Today's cases:{" "}
          <span className="text-[#d6a742] font-medium">{data?.todayCases}</span>
        </p>
        <p className="text-sm border border-dashed border-gray-600 p-4 rounded-md">
          Total deaths:{" "}
          <span className="text-[#ff0037] font-medium">{data?.deaths}</span>
        </p>
        <p className="text-sm border border-dashed border-gray-600 p-4 rounded-md">
          Today's deaths:{" "}
          <span className="text-[#d45d85] font-medium">
            {data?.todayDeaths}
          </span>
        </p>
        <p className="text-sm border border-dashed border-gray-600 p-4 rounded-md">
          Total recovered:{" "}
          <span className="text-[#2ad175] font-medium">{data?.recovered}</span>
        </p>
        <p className="text-sm border border-dashed border-gray-600 p-4 rounded-md">
          Today's recovered:{" "}
          <span className="text-[#79d17d] font-medium">
            {data?.todayRecovered}
          </span>
        </p>
        <p className="text-sm border border-dashed border-gray-600 p-4 rounded-md">
          Active:{" "}
          <span className="text-[#cab91c] font-medium">{data?.active}</span>
        </p>
        <p className="text-sm border border-dashed border-gray-600 p-4 rounded-md">
          Critical:{" "}
          <span className="text-[#70450c] font-medium">{data?.critical}</span>
        </p>
        <p className="text-sm border border-dashed border-gray-600 p-4 rounded-md">
          Total Tested:{" "}
          <span className="text-[#a2cc2d] font-medium">{data?.tests}</span>
        </p>
        <p className="text-sm border border-dashed border-gray-600 p-4 rounded-md">
          Tests/million:{" "}
          <span className="text-[#4669c7] font-medium">
            {data?.testsPerOneMillion}
          </span>
        </p>
      </div>
      {barChartData != undefined ? (
        <BarChart
          width={700}
          height={300}
          data={barChartData}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
          className="self-center"
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="value" fill="#8567d6" />
        </BarChart>
      ) : null}
    </div>
  );
};

export default CovidData;
