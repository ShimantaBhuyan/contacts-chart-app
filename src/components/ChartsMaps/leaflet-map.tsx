import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { useQuery } from "@tanstack/react-query";
import CountryPopup from "./country-popup";

const LeafletMap = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["countryData"],
    staleTime: 600000,
    queryFn: () =>
      fetch("https://disease.sh/v3/covid-19/countries").then((res) =>
        res.json()
      ),
  });

  if (isLoading) {
    return <div className=" min-h-[551px]">Loading...</div>;
  }

  if (isError) {
    return <div>Error fetching data</div>;
  }

  console.log({ countryData: data });

  const IndiaData = data.find((country: any) => country.country === "India");

  return (
    <div className="w-full z-0 px-5 flex flex-col gap-5">
      <h2 className="text-2xl font-bold mb-4">Countrywise COVID-19</h2>
      <MapContainer
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        center={[IndiaData.countryInfo.lat, IndiaData.countryInfo.long]}
        zoom={5}
        scrollWheelZoom={false}
        className="min-h-[800px]"
      >
        <TileLayer
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {data.length > 0
          ? data.map((countryData: any) => {
              const countryPosition: [number, number] = [
                countryData.countryInfo.lat,
                countryData.countryInfo.long,
              ];
              return (
                <Marker
                  key={countryData.countryInfo._id}
                  position={countryPosition}
                >
                  <Popup>
                    <CountryPopup countryData={countryData} />
                  </Popup>
                </Marker>
              );
            })
          : null}
      </MapContainer>
    </div>
  );
};

export default LeafletMap;
