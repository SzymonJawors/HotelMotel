import cloudinary from "../configs/cloudinary.js";
import Hotel from "../models/Hotel.js";
import Room from "../models/Room.js";

export const createRoom = async (req, res) => {
  try {
    const { roomType, pricePerNight, amenities } = req.body;
    const hotel = await Hotel.findOne({
      owner: req.auth().userId,
    });
    if (!hotel)
      return res.json({
        success: false,
        message: "Nie ma takiego hotelu",
      });

    const uploadImages = req.files.map((file) =>
      cloudinary.uploader.upload(file.path)
    );
    const uploaded = await Promise.all(uploadImages);
    const images = uploaded.map((img) => img.secure_url);

    await Room.create({
      hotel: hotel._id,
      roomType,
      pricePerNight: Number(pricePerNight),
      amenities: JSON.parse(amenities),
      images,
    });

    res.json({ success: true, message: "utworzono pokój" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export const deleteRoom = async (req, res) => {
  try {
    const { roomId } = req.body;

    const userId = req.user._id;

    const hotel = await Hotel.findOne({ owner: userId });
    if (!hotel) {
      return res.json({
        success: false,
        message: "Nie znaleziono hotelu",
      });
    }

    const room = await Room.findById(roomId);
    if (!room) {
      return res.json({
        success: false,
        message: "Nie znaleziono pokoju",
      });
    }

    if (room.hotel.toString() !== hotel._id.toString()) {
      return res.json({
        success: false,
        message: "To nie jest Twój pokój!",
      });
    }

    await Room.findByIdAndDelete(roomId);

    res.json({ success: true, message: "Pokój usunięty" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export const getRooms = async (req, res) => {
  try {
    const rooms = await Room.find({ isAvailable: true })
      .populate({
        path: "hotel",
        populate: { path: "owner", select: "image" },
      })
      .sort({ createdAt: -1 });
    res.json({ success: true, rooms });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export const getOwnerRooms = async (req, res) => {
  try {
    const hotelData = await Hotel.findOne({
      owner: req.auth.userId,
    });
    if (!hotelData)
      return res.json({ success: false, rooms: [] });

    const rooms = await Room.find({
      hotel: hotelData._id,
    }).populate("hotel");
    res.json({ success: true, rooms });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export const toggleRoomAvailability = async (req, res) => {
  try {
    const { roomId } = req.body;
    const roomData = await Room.findById(roomId);
    if (!roomData)
      return res.json({
        success: false,
        message: "Pokój nie istnieje",
      });

    roomData.isAvailable = !roomData.isAvailable;
    await roomData.save();
    res.json({ success: true, message: "updated" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
