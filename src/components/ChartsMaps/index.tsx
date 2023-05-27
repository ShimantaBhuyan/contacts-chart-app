import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import CovidData from "./covid-data";
// import LineChartComponent from "./line-chart";

const queryClient = new QueryClient();

const ChartsMaps: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <CovidData />
      {/* <LineChartComponent /> */}
      <div className="h-20"></div>
    </QueryClientProvider>
  );
};

export default ChartsMaps;
