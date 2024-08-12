import MarkerPopup from "@/Components/Buy/MarkerPopup";
import mapboxgl, { Map, Marker } from "mapbox-gl";
import maplibregl from "maplibre-gl";
import ReactDOM from "react-dom";

export const handleMouseEvent = (
  isMobile,
  markerElement,
  marker,
  map,
  auction,
  setShowBidDetail,
  setAuctionDetailData
) => {
  const el = (
    <MarkerPopup
      auction={auction}
      setShowBidDetail={setShowBidDetail}
      setAuctionDetailData={setAuctionDetailData}
    />
  );
  const placeholder = document.createElement("div");
  ReactDOM.render(el, placeholder);
  if (!isMobile) {
    markerElement.addEventListener("mouseenter", () => {
      const elementToRemove = document.querySelector(
        ".marker-popup-hovered-class"
      );
      if (!elementToRemove) {
        new mapboxgl.Popup({
          closeOnClick: false,
          offset: [0, -20],
          className: "marker-popup-hovered-class",
        })
          .setLngLat(marker.getLngLat())
          .setDOMContent(placeholder)
          .addTo(map);
      }
    });
  } else {
    markerElement.addEventListener("touchend", (e) => {
      const elementToRemove = document.querySelector(
        ".marker-popup-hovered-class"
      );
      if (elementToRemove) elementToRemove.remove();
      else {
        new mapboxgl.Popup({
          closeOnClick: false,
          offset: [0, -20],
          className: "marker-popup-hovered-class",
        })
          .setLngLat(marker.getLngLat())
          .setDOMContent(placeholder)
          .addTo(map);
      }
    });
  }
};
