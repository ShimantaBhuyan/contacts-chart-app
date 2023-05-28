import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import CovidData from "./covid-data";
import HistoricalDataChart from "./historical-charts";

const queryClient = new QueryClient();

const ChartsMaps: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <CovidData />
      <HistoricalDataChart />
      <div className="h-20"></div>
    </QueryClientProvider>
  );
};

export default ChartsMaps;
