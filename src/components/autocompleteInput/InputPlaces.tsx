import React, { useEffect, useRef, useState } from "react";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";
import cn from "classnames";
import { Coords } from "google-map-react";
import { useLocation } from "react-router-dom";
// import { useTypedSelector } from "@/app/hooks/useTypedSelector";

interface IInputPlaces {
  cbSuccess: (address: string, location: Coords, type: string) => void;
  type: "from" | "to";
  disabled? : boolean;
  defaultLocation? :string | null
}

const InputPlaces: React.FC<IInputPlaces> = ({ cbSuccess, type,disabled=false,defaultLocation=null }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [address, setAddress] = useState<string>();
  useEffect(()=>{
    if(defaultLocation){
      setAddress(defaultLocation)
    }
  },[defaultLocation])

  // const { travelTime } = useTypedSelector((state) => state.taxi);
const {pathname} = useLocation()
  const setFocus = () => {
    inputRef?.current?.focus();
  };

  const isFrom = type === "from";

  useEffect(() => {
    if (isFrom) setFocus();
  }, [type]);

  const handleSelect = (address: string) => {
    console.log(address);

    geocodeByAddress(address)
      .then((results) => getLatLng(results[0]))
      .then((location) => {
        cbSuccess(address, location, type);
        setAddress(address);
      })
      .catch((err) => console.log("error", err));
  };

  return (
    <PlacesAutocomplete
      value={address}
      onChange={setAddress}
      onSelect={handleSelect}
      onError={(error) => console.log(error)}
    >
      {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
        <div className="relative">
          <div onClick={setFocus}>
            <input
              {...getInputProps({
                ref: inputRef,
                disabled:disabled,
                placeholder: isFrom ? "Բարձման վայրը" : "Բեռնաթափման վայրը",
                className:pathname.includes('changeitems') ? "w-full h-full px-2 py-[12px] rounded-md border-none focus:outline-none focus:bg-blue-100 placeholder:text-black" :
                  "p-4 block w-full rounded-md border-[1px] border-slate-400 py-1.5 text-gray-900  ring-0 focus:ring-0 placeholder:text-gray-400   sm:text-sm sm:leading-6",
              })}
            /> 
          </div>
          <div
            className={cn(
              "absolute w-full h-0 overflow-y-auto rounded-b-lg z-50",
              {
                "h-48": suggestions.length || loading,
              }
            )}
          >
            {loading && <div className="p-2 bg-white">Բեռնում է ...</div>}

            {suggestions.map((suggestion, id) => {
              return (
                <div
                  {...getSuggestionItemProps(suggestion, {
                    className: cn("cursor-pointer p-3", {
                      "bg-gray-100": suggestion.active,
                      "bg-white": !suggestion.active,
                    }),
                  })}
                  key={`loc ${id}`}
                >
                  <span>{suggestion.description}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </PlacesAutocomplete>
  );
};

export default InputPlaces;
