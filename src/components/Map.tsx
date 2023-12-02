import React, { useEffect, useState } from "react";
import GoogleMapReact from "google-map-react";
import { useMapActions } from "../hooks/useMapActions";

interface IMAP {
  map: google.maps.Map;
  maps: any;
}
interface MapProps {
  pickup: any;
  delivery: any;
  setDistanceAndDur:any
}
export const Map = ({pickup,delivery,setDistanceAndDur}:MapProps) => {
  const [MAP, setMAP] = useState<IMAP>({} as IMAP);
  const [isExistRoute, setIsExistRoute] = useState(false);
  const { setTravelTime, setSelectedOption } = useMapActions();

  
  const renderWay = () => {
    const { map, maps } = MAP;

    if (typeof maps.DirectionsRenderer === "function") {
      const directionsRenderer: google.maps.DirectionsRenderer =
        new maps.DirectionsRenderer();
      const directionsService: google.maps.DirectionsService =
        new maps.DirectionsService();

      directionsService
        .route({
          origin: pickup?.location,
          destination: delivery?.location,
          travelMode: google.maps.TravelMode.DRIVING,
        })
        .then((res) => {
          directionsRenderer.setDirections(res);

          // stex karanq tevoxutyun@ vercnenq kam kilometr@, kam urish ban: videoyi mej 1:25 ropen a
          const durationSec = res.routes[0].legs[0].duration?.text;
          const km = res.routes[0].legs[0].distance?.text;

          setDistanceAndDur({
            duration:durationSec,
            distance : km
          })

          
        })
        .catch((err) => alert(err));

      directionsRenderer.setOptions({
        markerOptions: {
          clickable: false,
        },
      });
      directionsRenderer.setMap(map);
    }
  };

  useEffect(() => {
    if (
      pickup?.location?.lat &&
      delivery?.location?.lat &&
      MAP?.map &&
      MAP?.maps &&
      !isExistRoute
    ) {
      renderWay();
      
    }

  }, [pickup, delivery, MAP?.map, MAP?.maps, isExistRoute]);

  return (
    <div className="w-full h-full">
      <GoogleMapReact
        bootstrapURLKeys={{ key: String(process.env.REACT_APP_MAPS_KEY) }}
        defaultCenter={{
          lat: 41.054028,
          lng: 44.615734,
        }}
        defaultZoom={13}
        options={
          {
            // fullscreenControl: false,
            // zoomControl: false,
            // keyboardShortcuts: false,
            // clickableIcons: false,
            // scrollwheel: false,
          }
        }
        center={
          pickup?.location?.lat
            ? {
                lat: pickup?.location?.lat,
                lng: pickup?.location?.lng,
              }
            : undefined
        }
        yesIWantToUseGoogleMapApiInternals
        onGoogleApiLoaded={setMAP}
      />
    </div>
  );
};
