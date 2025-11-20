import React, { useState, useEffect, useRef } from "react";
import { assets } from "../assets/assets";
import { useAppContext } from "../context/AppContext";

const Hero = () => {
  const [destination, setDestination] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] =
    useState(false);
  const wrapperRef = useRef(null);

  const { navigate, getToken, axios, setSearchedCities } =
    useAppContext();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target)
      ) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener(
      "mousedown",
      handleClickOutside
    );
    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };
  }, [wrapperRef]);

  const onSearch = async (e) => {
    e.preventDefault();
    navigate(`/rooms?destination=${destination}`);
    await axios.post(
      "/api/user/store-recent-search",
      { recentSearchedCity: destination },
      {
        headers: {
          Authorization: `Bearer ${await getToken()}`,
        },
      }
    );
    setSearchedCities((prevSearchedCities) => {
      const updatedSearchedCities = [
        ...prevSearchedCities,
        destination,
      ];
      if (updatedSearchedCities.length > 3) {
        updatedSearchedCities.shift();
      }
      return updatedSearchedCities;
    });
  };

  const handleCityChange = async (e) => {
    const value = e.target.value;
    setDestination(value);

    if (value.length > 2) {
      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&q=${value}&limit=5`
        );
        const data = await response.json();
        setSuggestions(data);
        setShowSuggestions(true);
      } catch (error) {
        console.error(error);
      }
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const selectSuggestion = (cityName) => {
    const shortName = cityName.split(",")[0];
    setDestination(shortName);
    setSuggestions([]);
    setShowSuggestions(false);
  };

  return (
    <div className='flex flex-col items-start justify-center px-6 md:px-16 lg:px-24 xl:px-32 text-white bg-[url("/src/assets/heroImage.png")] bg-no-repeat bg-cover bg-center h-screen'>
      <p className="bg-[#49B9FF]/50 px-3.5 py-1 rounded-full mt-20">
        Hotelowe doświadczenie na najwyższym poziomie
      </p>
      <h1 className="font-playfair text-2xl md:text-5xl md:text-[56px] md:leading-[56px] font-bold md:font-extrabold max-w-xl mt-4">
        Znajdź idealne miejsce na odpoczynek
      </h1>
      <p className="max-w-130 mt-2 text-sm md:text-base">
        Doświadcz luksusu i komfortu na najwyższym poziomie
        w najbardziej prestiżowych hotelach i resortach
        świata. Zacznij swoją podróż już dziś.
      </p>
      <form
        onSubmit={onSearch}
        className="bg-white text-gray-500 rounded-lg px-6 py-4 mt-8 flex flex-col md:flex-row max-md:items-start gap-4 max-md:mx-auto relative z-10"
      >
        <div
          className="relative w-full md:w-auto"
          ref={wrapperRef}
        >
          <div className="flex items-center gap-2">
            <img
              src={assets.calenderIcon}
              alt="kalendarz"
              className="h-4"
            />
            <label htmlFor="destinationInput">
              Miejsce docelowe
            </label>
          </div>
          <input
            onChange={handleCityChange}
            value={destination}
            id="destinationInput"
            type="text"
            className="rounded border border-gray-200 px-3 py-1.5 mt-1.5 text-sm outline-none w-full md:w-48"
            placeholder="Np. Kraków"
            autoComplete="off"
            required
            onFocus={() =>
              destination.length > 2 &&
              setShowSuggestions(true)
            }
          />

          {showSuggestions && suggestions.length > 0 && (
            <ul className="absolute top-full left-0 mt-2 w-full min-w-[300px] bg-white border border-gray-200 rounded-md shadow-2xl max-h-60 overflow-y-auto z-50">
              {suggestions.map((city, index) => (
                <li
                  key={index}
                  onClick={() =>
                    selectSuggestion(city.display_name)
                  }
                  className="px-4 py-3 text-sm text-gray-800 hover:bg-gray-100 cursor-pointer border-b border-gray-100 last:border-0 text-left"
                >
                  {city.display_name}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div>
          <div className="flex items-center gap-2">
            <img
              src={assets.calenderIcon}
              alt="icon"
              className="h-4"
            />
            <label htmlFor="checkIn">Zameldowanie</label>
          </div>
          <input
            id="checkIn"
            type="date"
            className="rounded border border-gray-200 px-3 py-1.5 mt-1.5 text-sm outline-none"
          />
        </div>

        <div>
          <div className="flex items-center gap-2">
            <img
              src={assets.calenderIcon}
              alt="icon"
              className="h-4"
            />
            <label htmlFor="checkOut">Wymeldowanie</label>
          </div>
          <input
            id="checkOut"
            type="date"
            className="rounded border border-gray-200 px-3 py-1.5 mt-1.5 text-sm outline-none"
          />
        </div>

        <div className="flex md:flex-col max-md:gap-2 max-md:items-center">
          <label htmlFor="guests">Liczba gości</label>
          <input
            min={1}
            max={4}
            id="guests"
            type="number"
            className="rounded border border-gray-200 px-3 py-1.5 mt-1.5 text-sm outline-none max-w-16"
            placeholder="0"
          />
        </div>

        <button className="flex items-center justify-center gap-1 rounded-md bg-black py-3 px-4 text-white my-auto cursor-pointer max-md:w-full max-md:py-1">
          <img
            src={assets.searchIcon}
            alt="szukaj"
            className="h-7"
          />
          <span>Szukaj</span>
        </button>
      </form>
    </div>
  );
};

export default Hero;
