import { useAppContext } from "../context/AppContext";
import HotelCard from "./HotelCard";
import Title from "./Title";
const FeaturedDestination = () => {
  const { rooms, navigate } = useAppContext();
  return (
    rooms.length > 0 && (
      <div className="flex flex-col items-center px-6 md:px-16 lg:px-24 bg-slate-50 py-20">
        <Title
          title="Wybrane miejsca"
          subTitle="Odkryj naszą starannie wyselekcjonowaną kolekcję wyjątkowych obiektów z całego świata, które oferują niezrównany luksus, komfort i niezapomniane doświadczenia dla wymagających podróżnych."
        />
        <div className="flex flex-col md:flex-row flex-wrap  justify-center gap-6 mt-20 w-full">
          {rooms.slice(0, 4).map((room, index) => (
            <HotelCard
              key={room._id}
              room={room}
              index={index}
            />
          ))}
        </div>
        <button
          onClick={() => {
            navigate("/rooms");
            scrollTo(0, 0);
          }}
          className="my-16 px-4 py-4 text-sm font-medium border border-gray-300 rounded bg-white hover:bg-gray-50 transition-all cursor-pointer"
        >
          Zobacz wszystkie miejsca
        </button>
      </div>
    )
  );
};

export default FeaturedDestination;
