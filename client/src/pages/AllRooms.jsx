import React, { useState } from "react";
import {
  assets,
  facilityIcons,
  roomsDummyData,
} from "../assets/assets";
import { useNavigate } from "react-router-dom";
import StarRating from "../components/StarRating";

const CheckBox = ({
  label,
  selected = false,
  onChange = () => {},
}) => {
  return (
    <label className="flex gap-3 items-center cursor-pointer mt-2 text-sm">
      <input
        type="checkbox"
        checked={selected}
        onChange={(e) => onChange(e.target.checked, label)}
      />
      <span className="font-light select-none">
        {label}
      </span>
    </label>
  );
};

const RadioButton = ({
  label,
  selected = false,
  onChange = () => {},
}) => {
  return (
    <label className="flex gap-3 items-center cursor-pointer mt-2 text-sm">
      <input
        type="radio"
        name="sortOption"
        checked={selected}
        onChange={() => onChange(label)}
      />
      <span className="font-light select-none">
        {label}
      </span>
    </label>
  );
};

const AllRooms = () => {
  const navigate = useNavigate();
  const [openFilters, setOpenFilters] = useState(false);
  const roomTypes = [
    "Pokój jednoosobowy",
    "Pokój dwuosobowy",
    "Luksusowy apartament",
    "Apartament rodzinny",
  ];
  const priceRange = [
    "0 do 500",
    "501 do 1000",
    "1001 do 2000",
    "2001 do 3000",
  ];

  const sortOptions = [
    "Cena od najniższej do najwyższej",
    "Cena od najwyższej do najniższej",
    "Najnowsze",
  ];

  return (
    <div className="relative flex flex-col-reverse lg:flex-col items-start justify-between p-28 md:pt-35 px-4 lg:px-24 lg:pr-96 xl:px-32">
      <div>
        <div className="flex flex-col items-start text-left">
          <h1 className="font-playfair text-4xl md:text-[40px]">
            Pokoje hotelowe
          </h1>
          <p className="text-sm md:text-base text-gray-500/90 mt-2">
            Wykorzystaj nasze czasowe promocje i wyjątkowe
            pakiety, które sprawią, że Twój pobyt będzie
            niezapomniany.
          </p>
        </div>
      </div>
      {roomsDummyData.map((room) => (
        <div
          key={room._id}
          className="flex flex-col md:flex-row items-start py-10 gap-6 border-b border-gray-300 last:pb-30 last:border-0"
        >
          <img
            src={room.images[0]}
            alt="hotel img"
            title="Informacje o pokoju"
            className="max-h-65 md:w-1/2 rounded-xl shadow-lg object-cover cursor-pointer"
            onClick={() => {
              navigate(`/rooms/${room._id}`);
              scrollTo(0, 0);
            }}
          />
          <div className="md:w-1/2 flex flex-col gap-2">
            <p className="text-gray-500">
              {room.hotel.city}
            </p>
            <p
              onClick={() => {
                navigate(`/rooms/${room._id}`);
                scrollTo(0, 0);
              }}
              className="text-gray-800 text-3xl font-playfair cursor-pointer"
            >
              {room.hotel.name}
            </p>
            <div className="flex items-center">
              <StarRating />
              <p className="ml-2">200+ opini</p>
            </div>
            <div className="flex items-center gap-1 text-gray-500 mt-2 text-sm">
              <img
                src={assets.locationIcon}
                alt="locateicon"
              />
              <span>{room.hotel.address}</span>
            </div>
            <div className="flex flex-wrap items-center mt-3 mb-6 gap-4">
              {room.amenities.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[#F5F5FF]/70"
                >
                  <img
                    src={facilityIcons[item]}
                    alt={item}
                    className="w-5 h-5"
                  />
                  <p className="text-xs">{item}</p>
                </div>
              ))}
            </div>
            <p className="text-xl font-medium text-gray-700">
              ${room.pricePerNight} /noc
            </p>
          </div>
        </div>
      ))}
      <div className="bg-white w-80 border border-gray-300 text-gray-600 max-lg:mb-8 lg:mt-16 lg:absolute lg:top-35 lg:right-24 xl:right-32">
        <div
          className={`flex items-center justify-between px-5 py-2.5 min-lg:border-b border-gray-300 ${
            openFilters && "border-b"
          }`}
        >
          <p className="text-base font-medium text-gray-800">
            Filtry
          </p>
          <div className="text-xs cursor-pointer">
            <span
              className="lg:hidden"
              onClick={() => setOpenFilters(!openFilters)}
            >
              {openFilters
                ? "Ukryj filtry"
                : "Pokaż filtry"}
            </span>
            <span className="hidden lg:block">Wyczyść</span>
          </div>
        </div>
        <div>
          <div
            className={`${
              openFilters ? "h-auto" : "h-0 lg:h-auto"
            } overflow-hidden transition-all duration-700`}
          >
            <div className="px-5 pt-5">
              <p className="font-medium text-gray-800 pb-2">
                Popularne filtry
              </p>
              {roomTypes.map((room, index) => (
                <CheckBox key={index} label={room} />
              ))}
            </div>
            <div className="px-5 pt-5">
              <p className="font-medium text-gray-800 pb-2">
                Zakres cen
              </p>
              {priceRange.map((range, index) => (
                <CheckBox
                  key={index}
                  label={`${range} zł`}
                />
              ))}
            </div>
            <div className="px-5 pt-5 pb-7">
              <p className="font-medium text-gray-800 pb-2">
                Sortuj po
              </p>
              {sortOptions.map((option, index) => (
                <RadioButton key={index} label={option} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllRooms;
