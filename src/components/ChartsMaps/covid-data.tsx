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
    <div className="flex flex-col justify-center p-4 gap-10 w-full">
      <h2 className="text-2xl font-bold mb-4">
        Worldwide COVID-19 Data{" "}
        <span className="text-sm font-medium">
          {"("}as of {moment(data.updated).format("MMMM Do YYYY, h:mm:ss a")}
          {")"}
        </span>
      </h2>

      <div className="relative overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-600">
          <thead className="text-xs uppercase bg-gray-50 bg-gray-700 text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Statistic
              </th>
              <th scope="col" className="px-6 py-3">
                Value
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="bg-white border-b border-gray-700">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
              >
                Total Population
              </th>
              <td className="px-6 py-4">{data?.population}</td>
            </tr>
            <tr className="bg-white border-b border-gray-700">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
              >
                Affected Countries
              </th>
              <td className="px-6 py-4">{data?.affectedCountries}</td>
            </tr>
            <tr className="bg-white border-b border-gray-700">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
              >
                Total Cases
              </th>
              <td className="px-6 py-4">{data?.cases}</td>
            </tr>
            <tr className="bg-white border-b border-gray-700">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
              >
                Todays Cases
              </th>
              <td className="px-6 py-4">{data?.todayCases}</td>
            </tr>
            <tr className="bg-white border-b border-gray-700">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
              >
                Total Deaths
              </th>
              <td className="px-6 py-4">{data?.deaths}</td>
            </tr>
            <tr className="bg-white border-b border-gray-700">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
              >
                Todays Deaths
              </th>
              <td className="px-6 py-4">{data?.todayDeaths}</td>
            </tr>
            <tr className="bg-white border-b border-gray-700">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
              >
                Total Recovered
              </th>
              <td className="px-6 py-4">{data?.recovered}</td>
            </tr>
            <tr className="bg-white border-b border-gray-700">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
              >
                Today Recovered
              </th>
              <td className="px-6 py-4">{data?.todayRecovered}</td>
            </tr>
            <tr className="bg-white border-b border-gray-700">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
              >
                Active
              </th>
              <td className="px-6 py-4">{data?.active}</td>
            </tr>
            <tr className="bg-white border-b border-gray-700">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
              >
                Critical
              </th>
              <td className="px-6 py-4">{data?.critical}</td>
            </tr>
            <tr className="bg-white border-b border-gray-700">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
              >
                Total tested
              </th>
              <td className="px-6 py-4">{data?.tests}</td>
            </tr>
            <tr className="bg-white border-b border-gray-700">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
              >
                Tests/million
              </th>
              <td className="px-6 py-4">{data?.testsPerOneMillion}</td>
            </tr>
          </tbody>
        </table>
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
          className="self-center scale-50 sm:scale-100"
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
