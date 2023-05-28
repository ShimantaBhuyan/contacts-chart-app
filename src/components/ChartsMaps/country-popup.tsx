import moment from "moment";

const CountryPopup = ({ countryData }: { countryData: any }) => {
  return (
    <div className="flex flex-col justify-center gap-2 w-fit max-w-[520px]">
      <div className="flex flex-col gap-2">
        <div className="flex gap-2">
          <img
            src={countryData.countryInfo.flag}
            alt={countryData.country}
            width={40}
            height={25}
            className="object-contain max-w-[40px] max-h-[25px]"
          />
          <h2 className="text-lg font-bold mr-2">{countryData.country}</h2>
        </div>
        <div className="flex gap-2">
          <span className="text-[10px] font-medium mr-2 px-2.5 py-1 rounded-full bg-blue-900 text-blue-100">
            {moment(countryData.updated).format("MMMM Do YYYY")}
          </span>
          <span className="text-[10px] font-medium mr-2 px-2.5 py-1 rounded-full bg-green-900 text-green-100">
            Population: {countryData.population}
          </span>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-2">
        <div className="flex flex-col gap-2">
          <h2 className="text-md font-medium">All to date</h2>
          <div className="flex flex-wrap w-full gap-1">
            <span className="text-xs border border-dashed border-gray-600 p-1 rounded-md">
              Cases:{" "}
              <span className="text-gray-700 font-medium">
                {countryData.cases}
              </span>
            </span>
            <span className="text-xs border border-dashed border-gray-600 p-1 rounded-md">
              Recovered:{" "}
              <span className="text-gray-700 font-medium">
                {countryData.recovered}
              </span>
            </span>
            <span className="text-xs border border-dashed border-gray-600 p-1 rounded-md">
              Deaths:{" "}
              <span className="text-gray-700 font-medium">
                {countryData.deaths}
              </span>
            </span>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <h2 className="text-md font-medium">Today</h2>
          <div className="flex flex-wrap w-full gap-1">
            <span className="text-xs border border-dashed border-gray-600 p-1 rounded-md">
              Cases:{" "}
              <span className="text-gray-700 font-medium">
                {countryData.todayCases}
              </span>
            </span>
            <span className="text-xs border border-dashed border-gray-600 p-1 rounded-md">
              Recovered:{" "}
              <span className="text-gray-700 font-medium">
                {countryData.todayRecovered}
              </span>
            </span>
            <span className="text-xs border border-dashed border-gray-600 p-1 rounded-md">
              Deaths:{" "}
              <span className="text-gray-700 font-medium">
                {countryData.todayDeaths}
              </span>
            </span>
            <span className="text-xs border border-dashed border-gray-600 p-1 rounded-md">
              Active:{" "}
              <span className="text-gray-700 font-medium">
                {countryData.active}
              </span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CountryPopup;
