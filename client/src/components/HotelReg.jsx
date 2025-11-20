import React, { useState } from "react";
import { assets } from "../assets/assets";
import { useAppContext } from "../context/AppContext";
import { toast } from "react-hot-toast";

const HotelReg = () => {
  const { setShowHotelReg, axios, getToken, setIsOwner } =
    useAppContext();
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [contact, setContact] = useState("");
  const [city, setCity] = useState("");

  const onSubmitHandler = async (e) => {
    try {
      e.preventDefault();
      const { data } = await axios.post(
        `/api/hotels/`,
        { name, contact, address, city },
        {
          headers: {
            Authorization: `Bearer ${await getToken()}`,
          },
        }
      );
      if (data.success) {
        toast.success(data.message);
        setIsOwner(true);
        setShowHotelReg(false);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div
      onClick={() => setShowHotelReg(false)}
      className="fixed top-0 bottom-0 left-0 right-0 z-100 flex items-center justify-center bg-black/70"
    >
      <form
        onSubmit={onSubmitHandler}
        onClick={(e) => e.stopPropagation()}
        className="flex bg-white rounded-xl max-w-4xl max-md:mx-2"
      >
        <img
          src={assets.regImage}
          alt="reqimg"
          className="w-1/2 rounded-xl hidden md:block"
        />
        <div className="relative flex flex-col items-center md:w-1/2 p-8 md:p-10">
          <img
            onClick={() => setShowHotelReg(false)}
            src={assets.closeIcon}
            alt="closeicon"
            className="absolute top-4 right-4 h-4 w-4 cursor-pointer"
          />
          <p className="text-2xl font-semibold mt-6">
            Zarejestruj swój Hotel
          </p>
          <div className="w-full mt-4">
            <label
              htmlFor="name"
              className="font-medium text-gray-500"
            >
              Nazwa Hotelu
            </label>
            <input
              id="name"
              onChange={(e) => setName(e.target.value)}
              value={name}
              type="text"
              placeholder="Nazwa hotelu"
              className="border border-gray-200 rounded w-full px-3 py-2.5 mt-1 outline-indigo-500 font-light"
              required
            />
          </div>
          <div className="w-full mt-4">
            <label
              htmlFor="contact"
              className="font-medium text-gray-500"
            >
              Numer telefonu
            </label>
            <input
              id="contact"
              onChange={(e) => setContact(e.target.value)}
              value={contact}
              type="text"
              placeholder="Numer telefonu"
              className="border border-gray-200 rounded w-full px-3 py-2.5 mt-1 outline-indigo-500 font-light"
              required
            />
          </div>
          <div className="w-full mt-4">
            <label
              htmlFor="address"
              className="font-medium text-gray-500"
            >
              Adres
            </label>
            <input
              id="address"
              onChange={(e) => setAddress(e.target.value)}
              value={address}
              type="text"
              placeholder="Adres"
              className="border border-gray-200 rounded w-full px-3 py-2.5 mt-1 outline-indigo-500 font-light"
              required
            />
          </div>
          <div className="w-full mt-4">
            <label
              htmlFor="city"
              className="font-medium text-gray-500"
            >
              Miasto
            </label>
            <input
              id="city"
              onChange={(e) => setCity(e.target.value)}
              value={city}
              type="text"
              placeholder="Wpisz miasto"
              className="border border-gray-200 rounded w-full px-3 py-2.5 mt-1 outline-indigo-500 font-light"
              required
            />
          </div>
          <button className="bg-indigo-500 hover:bg-indigo-600 transition-all text-white mr-auto px-6 py-2 rounded cursor-pointer mt-6">
            Zarejestruj
          </button>
        </div>
      </form>
    </div>
  );
};

export default HotelReg;
