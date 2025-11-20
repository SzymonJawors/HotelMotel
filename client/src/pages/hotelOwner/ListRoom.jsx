import React, { useEffect, useState } from "react";
import Title from "../../components/Title";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";
import ConfirmModal from "../../components/ConfirmModal";

const ListRoom = () => {
  const [rooms, setRooms] = useState([]);
  const { axios, getToken, user, currency } =
    useAppContext();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [roomToDelete, setRoomToDelete] = useState(null);

  const fetchRooms = async () => {
    try {
      const { data } = await axios.get("/api/rooms/owner", {
        headers: {
          Authorization: `Bearer ${await getToken()}`,
        },
      });
      if (data.success) {
        setRooms(data.rooms);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const toggleAvailability = async (roomId) => {
    try {
      const { data } = await axios.post(
        "/api/rooms/toggle-availability",
        { roomId },
        {
          headers: {
            Authorization: `Bearer ${await getToken()}`,
          },
        }
      );
      if (data.success) {
        toast.success(data.message);
        fetchRooms();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const openDeleteModal = (roomId) => {
    setRoomToDelete(roomId);
    setIsModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!roomToDelete) return;
    try {
      const { data } = await axios.post(
        "/api/rooms/delete",
        { roomId: roomToDelete },
        {
          headers: {
            Authorization: `Bearer ${await getToken()}`,
          },
        }
      );

      if (data.success) {
        toast.success(data.message);
        fetchRooms();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsModalOpen(false);
      setRoomToDelete(null);
    }
  };

  useEffect(() => {
    if (user) {
      fetchRooms();
    }
  }, [user]);

  return (
    <div>
      <ConfirmModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirmDelete}
        title="Usuwanie pokoju"
        message="Czy na pewno chcesz trwale usunąć ten pokój? Tej operacji nie można cofnąć."
      />
      <Title
        align="left"
        font="outfit"
        title="Lista pokoi"
        subTitle="Przeglądaj, edytuj lub zarządzaj wszystkimi dostępnymi pokojami. Utrzymuj informacje na bieżąco, aby zapewnić użytkownikom jak najlepsze doświadczenie."
      />
      <p className="text-gray-500 mt-8">Wszystkie pokoje</p>
      <div className="w-full max-w-4xl text-left border border-gray-300 rounded-lg max-h-80 overflow-y-scroll mt-3">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="py-3 px-4 text-gray-800 font-medium">
                Nazwa
              </th>
              <th className="py-3 px-4 text-gray-800 font-medium max-sm:hidden">
                Obiekt
              </th>
              <th className="py-3 px-4 text-gray-800 font-medium">
                Cena
              </th>
              <th className="py-3 px-4 text-gray-800 font-medium text-center">
                Dostępność
              </th>
              <th className="py-3 px-4 text-gray-800 font-medium text-center">
                Usuń
              </th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {rooms.map((item, index) => (
              <tr
                key={index}
                className="border-t border-gray-300 hover:bg-gray-50"
              >
                <td className="py-3 px-4 text-gray-700">
                  {item.roomType}
                </td>
                <td className="py-3 px-4 text-gray-700 max-sm:hidden">
                  {item.amenities.join(", ")}
                </td>
                <td className="py-3 px-4 text-gray-700">
                  {item.pricePerNight} {currency}
                </td>
                <td className="py-3 px-4 text-center">
                  <label className="relative inline-flex items-center cursor-pointer justify-center">
                    <input
                      onChange={() =>
                        toggleAvailability(item._id)
                      }
                      type="checkbox"
                      className="sr-only peer"
                      checked={item.isAvailable}
                    />
                    <div className="w-12 h-7 bg-slate-300 rounded-full peer peer-checked:bg-blue-600 transition-colors"></div>
                    <span className="dot absolute left-1 top-1 w-5 h-5 bg-white rounded-full peer-checked:translate-x-5 transition-transform"></span>
                  </label>
                </td>
                <td className="py-3 px-4 text-center">
                  <button
                    onClick={() =>
                      openDeleteModal(item._id)
                    }
                    className="h-8 w-8 flex items-center justify-center rounded-full border border-red-200 bg-red-50 text-red-600 hover:bg-red-100 hover:border-red-300 transition-all cursor-pointer mx-auto"
                  >
                    X
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ListRoom;
