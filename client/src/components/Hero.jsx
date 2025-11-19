import React from "react";
import { assets, cities } from "../assets/assets";

const Hero = () => {
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
      <form className="bg-white text-gray-500 rounded-lg px-6 py-4 mt-8 flex flex-col md:flex-row max-md:items-start gap-4 max-md:mx-auto">
        <div>
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
            list="destinations"
            id="destinationInput"
            type="text"
            className=" rounded border border-gray-200 px-3 py-1.5 mt-1.5 text-sm outline-none"
            placeholder="Np. Kraków"
            required
          />
          <datalist id="destinations">
            {cities.map((city, index) => (
              <option value={city} key={index} />
            ))}
          </datalist>
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
            className=" rounded border border-gray-200 px-3 py-1.5 mt-1.5 text-sm outline-none"
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
            className=" rounded border border-gray-200 px-3 py-1.5 mt-1.5 text-sm outline-none"
          />
        </div>

        <div className="flex md:flex-col max-md:gap-2 max-md:items-center">
          <label htmlFor="guests">Liczba gości</label>
          <input
            min={1}
            max={4}
            id="guests"
            type="number"
            className=" rounded border border-gray-200 px-3 py-1.5 mt-1.5 text-sm outline-none  max-w-16"
            placeholder="0"
          />
        </div>

        <button className="flex items-center justify-center gap-1 rounded-md bg-black py-3 px-4 text-white my-auto cursor-pointer max-md:w-full max-md:py-1">
            <img src={assets.searchIcon} alt="szukaj" className="h-7"/>
          <span>Szukaj</span>
        </button>
      </form>
    </div>
  );
};

export default Hero;
