import React, { useState } from "react";
import Title from "../../components/Title";
import { assets } from "../../assets/assets";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

const AddRoom = () => {
  const { axios, getToken } = useAppContext();

  const [images, setImages] = useState({
    1: null,
    2: null,
    3: null,
    4: null,
  });

  const [inputs, setInputs] = useState({
    roomType: "",
    pricePerNight: 0,
    amenities: {
      "Darmowe WiFi": false,
      "Darmowe śniadania": false,
      "Room Service": false,
      "Widok na góry": false,
      "Widok na morze": false,
      "Widok na miasto": false,
      "Dostęp do basenu": false,
      "Siłownia / Fitness": false,
      "Klimatyzacja": false,
      "Prywatna łazienka": false,
      "Telewizor Smart TV": false,
      "Minibar": false,
      "Balkon / Taras": false,
      "Aneks kuchenny": false,
      "Miejsce parkingowe": false,
      "Przyjazny zwierzętom": false,
      "Udogodnienia dla niepełnosprawnych": false,
      "Ekspres do kawy": false,
    },
  });

  const [loading, setLoading] = useState(false);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (
      !inputs.roomType ||
      !inputs.pricePerNight ||
      !inputs.amenities ||
      !Object.values(images).some((image) => image)
    ) {
      toast.error("Wypełnij wszystkie pola!");
      return;
    }
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("roomType", inputs.roomType);
      formData.append("pricePerNight", inputs.pricePerNight);

      const amenities = Object.keys(inputs.amenities).filter(
        (key) => inputs.amenities[key]
      );
      formData.append("amenities", JSON.stringify(amenities));
      Object.keys(images).forEach((key) => {
        images[key] && formData.append("images", images[key]);
      });
      const { data } = await axios.post("/api/rooms", formData, {
        headers: {
          Authorization: `Bearer ${await getToken()}`,
        },
      });
      if (data.success) {
        toast.success(data.message);
        setInputs({
          roomType: "",
          pricePerNight: 0,
          amenities: {
            "Darmowe WiFi": false,
            "Darmowe śniadania": false,
            "Room Service": false,
            "Widok na góry": false,
            "Widok na morze": false,
            "Widok na miasto": false,
            "Dostęp do basenu": false,
            "Siłownia / Fitness": false,
            "Klimatyzacja": false,
            "Prywatna łazienka": false,
            "Telewizor Smart TV": false,
            "Minibar": false,
            "Balkon / Taras": false,
            "Aneks kuchenny": false,
            "Miejsce parkingowe": false,
            "Przyjazny zwierzętom": false,
            "Udogodnienia dla niepełnosprawnych": false,
            "Ekspres do kawy": false,
          },
        });
        setImages({ 1: null, 2: null, 3: null, 4: null });
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={onSubmitHandler}>
      <Title
        align="left"
        font="outfit"
        title="Dodaj pokój"
        subTitle="Wprowadź dane starannie, aby zapewnić dokładne informacje o pokojach, cenach i udogodnieniach, co poprawi doświadczenie użytkownika podczas rezerwacji."
      />
      <p className="text-gray-800 mt-10">Zdjęcia</p>
      <div className="grid grid-cols-2 sm:flex gap-4 my-2 flex-wrap">
        {Object.keys(images).map((key) => (
          <label htmlFor={`roomImage${key}`} key={key}>
            <img
              src={
                images[key]
                  ? URL.createObjectURL(images[key])
                  : assets.uploadArea
              }
              alt="img"
              className="max-h-13 h-13 cursor-pointer opacity-80"
            />
            <input
              type="file"
              accept="image/*"
              id={`roomImage${key}`}
              hidden
              onChange={(e) =>
                setImages({
                  ...images,
                  [key]: e.target.files[0],
                })
              }
            />
          </label>
        ))}
      </div>
      <div className="w-full flex max-sm:flex-col sm:gap-4 mt-4">
        <div className="flex-1 max-w-48">
          <p className="text-gray-800 mt-4">Rodzaj pokoju</p>
          <select
            value={inputs.roomType}
            onChange={(e) =>
              setInputs({
                ...inputs,
                roomType: e.target.value,
              })
            }
            className="border opacity-70 border-gray-300 mt-1 rounded p-2 w-full"
          >
            <option value="">Wybierz rodzaj pokoju</option>
            <option value="Pokój jednoosobowy">Pokój jednoosobowy</option>
            <option value="Pokój dwuosobowy">Pokój dwuosobowy</option>
            <option value="Pokój typu Twin">Pokój typu Twin (2 łóżka)</option>
            <option value="Pokój typu Studio">Pokój typu Studio</option>
            <option value="Luksusowy apartament">Luksusowy apartament</option>
            <option value="Apartament rodzinny">Apartament rodzinny</option>
            <option value="Penthouse">Penthouse</option>
            <option value="Bungalow">Bungalow</option>
            <option value="Pokój ekonomiczny">Pokój ekonomiczny</option>
          </select>
        </div>
        <div>
          <p className="mt-4 text-gray-800">
            Cena <span className="text-xs">/noc</span>
          </p>
          <input
            type="number"
            placeholder="0"
            className="border border-gray-300 mt-1 rounded p-2 w-24"
            value={inputs.pricePerNight}
            onChange={(e) =>
              setInputs({
                ...inputs,
                pricePerNight: e.target.value,
              })
            }
          />
        </div>
      </div>
      <p className="text-gray-800 mt-4">Udogodnienia</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 mt-2 text-gray-500">
        {Object.keys(inputs.amenities).map((amenity, index) => (
          <div key={index} className="flex items-center gap-2">
            <input
              type="checkbox"
              id={`amenities${index + 1}`}
              checked={inputs.amenities[amenity]}
              onChange={() =>
                setInputs({
                  ...inputs,
                  amenities: {
                    ...inputs.amenities,
                    [amenity]: !inputs.amenities[amenity],
                  },
                })
              }
              className="cursor-pointer"
            />
            <label
              htmlFor={`amenities${index + 1}`}
              className="cursor-pointer select-none text-sm"
            >
              {amenity}
            </label>
          </div>
        ))}
      </div>
      <button
        className="bg-primary text-white px-8 py-2 rounded mt-8 cursor-pointer hover:bg-primary-dull transition-all"
        disabled={loading}
      >
        {loading ? "Dodaje pokój..." : "Dodaj pokój"}
      </button>
    </form>
  );
};

export default AddRoom;