import { AuctionDataI } from "@/types";
import { getTimeLeft } from "@/utils/marketplaceUtils";
import Map, { Marker } from "react-map-gl";

interface AuctionCardProps {
  data: AuctionDataI;
}

const AuctionCard: React.FC<AuctionCardProps> = ({ data }) => {
  const endDate = new Date(data?.endDate);
  const timeLeft = getTimeLeft(endDate);
  const { latitude, longitude, title } = data?.properties[0] || {};

  return (
    <div className="w-[350px] md:w-full h-[227px] rounded-lg shadow-md overflow-hidden">
      <div className="w-full h-[130px]">
        <Map
          initialViewState={{
            latitude: latitude || 0,
            longitude: longitude || 0,
            zoom: 14,
          }}
          style={{ width: "100%", height: "100%" }}
          mapStyle="mapbox://styles/mapbox/streets-v11"
          mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}
          scrollZoom={false} // Disable scroll zoom
        >
          <Marker latitude={latitude || 0} longitude={longitude || 0}>
            <div className="bg-red-500 w-2 h-2 rounded-full" />
          </Marker>
        </Map>
      </div>
      <div className="px-4 py-2 flex flex-col items-start">
        <div className="text-sm text-black font-bold">Name</div>
        <div className="text-sm text-[#727272] truncate w-[95%]">{title}</div>
      </div>
      <div className="flex justify-between px-4 pb-2 bg-[#4285F4]/5 pt-1">
        <div className="flex flex-col items-start">
          <div className="text-sm text-[#727272]">Highest Bid</div>
          <div className="text-sm text-black font-bold">{data.highestBid}</div>
        </div>
        <div className="flex flex-col items-end">
          <div className="text-sm text-[#727272]">Time Left</div>
          <div className="text-sm text-black font-bold">{timeLeft}</div>
        </div>
      </div>
    </div>
  );
};

export default AuctionCard;
