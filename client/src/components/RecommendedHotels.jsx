import { useEffect, useState } from "react";
import { useAppContext } from "../context/AppContext";
import HotelCard from "./HotelCard";
import Title from "./Title";

const RecommendedHotels = () => {
  const { rooms, searchedCities } = useAppContext();
  const [recommended, setRecommended] = useState([]);

  const filterHotels = () => {
    if (!rooms || !searchedCities) {
      setRecommended([]);
      return;
    }
    const filteredHotels = rooms
      .slice()
      .filter(
        (room) =>
          room.hotel &&
          searchedCities.includes(room.hotel.city)
      );
    setRecommended(filteredHotels);
  };

  useEffect(() => {
    filterHotels();
  }, [rooms, searchedCities]);

  return (
    recommended.length > 0 && (
      <div className="flex flex-col items-center px-6 md:px-16 lg:px-24 bg-slate-50 py-20">
        <Title
          title="Polecane miejsca"
          subTitle="Poznaj nasze najlepiej oceniane i rekomendowane hotele oraz apartamenty, które zapewnią Ci wyjątkowy pobyt i pozwolą cieszyć się luksusem oraz najwyższym standardem usług."
        />
        <div className="flex flex-wrap items-center justify-center gap-6 mt-20">
          {recommended.slice(0, 4).map((room, index) => (
            <HotelCard
              key={room._id}
              room={room}
              index={index}
            />
          ))}
        </div>
      </div>
    )
  );
};

export default RecommendedHotels;
