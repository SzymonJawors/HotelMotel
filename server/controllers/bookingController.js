import transporter from "../configs/nodemailer.js";
import Booking from "../models/Booking.js";
import Hotel from "../models/Hotel.js";
import Room from "../models/Room.js";
import connectDB from "../configs/db.js";
import stripe from "stripe";

const checkAvailability = async ({
  checkInDate,
  checkOutDate,
  room,
}) => {
  try {
    await connectDB();
    const bookings = await Booking.find({
      room,
      checkInDate: { $lte: checkOutDate },
      checkOutDate: { $gte: checkInDate },
    });
    return bookings.length === 0;
  } catch (error) {
    console.error(error.message);
    return false;
  }
};

export const checkAvailabilityAPI = async (req, res) => {
  try {
    await connectDB();
    const { room, checkInDate, checkOutDate } = req.body;
    const isAvailable = await checkAvailability({
      checkInDate,
      checkOutDate,
      room,
    });
    res.json({ success: true, isAvailable });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export const createBooking = async (req, res) => {
  try {
    await connectDB();
    const { room, checkInDate, checkOutDate, guests } =
      req.body;

    const userId = req.user._id;

    const isAvailable = await checkAvailability({
      checkInDate,
      checkOutDate,
      room,
    });

    if (!isAvailable) {
      return res.json({
        success: false,
        message: "pokój nie dostępny",
      });
    }

    const roomData = await Room.findById(room).populate(
      "hotel"
    );

    if (!roomData) {
      return res.json({
        success: false,
        message: "Błąd danych pokoju",
      });
    }

    let totalPrice = roomData.pricePerNight;
    const checkIn = new Date(checkInDate);
    const checkOut = new Date(checkOutDate);
    const timeDiff = checkOut.getTime() - checkIn.getTime();
    const nights = Math.ceil(timeDiff / (1000 * 3600 * 24));
    totalPrice *= nights;

    const booking = await Booking.create({
      user: userId,
      room,
      hotel: roomData.hotel._id,
      guests: +guests,
      checkInDate,
      checkOutDate,
      totalPrice,
    });

    if (req.user.email) {
      try {
        const dateOptions = {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        };
        const mailOptions = {
          from: process.env.SENDER_EMAIL,
          to: req.user.email,
          subject: "Detale rezerwacji pokoju - HotelMotel",
          html: `
                <h2>Detale twojej rezerwacji</h2>
                <p>Witaj ${
                  req.user.username || "Użytkowniku"
                },</p>
                <p>Dziękujemy za twoją rezerwacje! Poniżej znajdują się wszysktie potrzebne informacje:</p>
                <ul>
                <li><strong>ID rezerwacji:</strong> ${
                  booking._id
                }</li>
                <li><strong>Nazwa Hotelu:</strong> ${
                  roomData.hotel.name
                }</li>
                <li><strong>Lokalizacja hotelu:</strong> ${
                  roomData.hotel.address
                }</li>
                <li><strong>Data zameldowania:</strong> ${new Date(
                  checkInDate
                ).toLocaleDateString(
                  "pl-PL",
                  dateOptions
                )}</li>
                <li><strong>Data wymeldowania:</strong> ${new Date(
                  checkOutDate
                ).toLocaleDateString(
                  "pl-PL",
                  dateOptions
                )}</li>
                <li><strong>Cena całkowita:</strong> ${
                  booking.totalPrice
                }zł</li>
                </ul>
                <p>Dziękujemy że wybrałeś nasz serwis!</p>
                `,
        };
        await transporter.sendMail(mailOptions);
      } catch (error) {
        console.log("Mail error:", error.message);
      }
    }

    res.json({ success: true, message: "zarezerwowano" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "wystąpił błąd" });
  }
};

export const cancelBooking = async (req, res) => {
  try {
    await connectDB();
    const { bookingId } = req.body;
    const userId = req.user._id;

    const booking = await Booking.findById(bookingId);

    if (!booking) {
      return res.json({
        success: false,
        message: "Nie znaleziono rezerwacji",
      });
    }

    if (booking.user.toString() !== userId.toString()) {
      return res.json({
        success: false,
        message:
          "Nie masz uprawnień do anulowania tej rezerwacji",
      });
    }

    await Booking.findByIdAndDelete(bookingId);

    res.json({
      success: true,
      message: "Rezerwacja została anulowana",
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export const getUserBookings = async (req, res) => {
  try {
    await connectDB();
    const userId = req.user._id;
    const bookings = await Booking.find({ user: userId })
      .populate("room hotel")
      .sort({ createdAt: -1 });
    res.json({ success: true, bookings });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "wystąpił błąd" });
  }
};

export const getHotelBookings = async (req, res) => {
  try {
    await connectDB();
    const hotel = await Hotel.findOne({
      owner: req.user._id,
    });
    if (!hotel) {
      return res.json({
        success: false,
        message: "nie znaleziono hotelu",
      });
    }
    const bookings = await Booking.find({
      hotel: hotel._id,
    })
      .populate("room hotel user")
      .sort({ createdAt: -1 });
    const totalBookings = bookings.length;
    const totalRevenue = bookings.reduce(
      (acc, booking) => acc + booking.totalPrice,
      0
    );
    res.json({
      success: true,
      dashboardData: {
        totalBookings,
        totalRevenue,
        bookings,
      },
    });
  } catch (error) {
    res.json({ success: false, message: "wystąpił błąd" });
  }
};

export const stripePayment = async (req, res) => {
  try {
    await connectDB();
    const { bookingId } = req.body;
    const booking = await Booking.findById(bookingId);
    const roomData = await Room.findById(
      booking.room
    ).populate("hotel");
    const totalPrice = booking.totalPrice;
    const origin = req.headers;
    const stripeInstance = new stripe(
      process.env.STRIPE_SECRET_KEY
    );

    const line_items = [
      {
        price_data: {
          currency: "pln",
          product_data: {
            name: roomData.hotel.name,
          },
          unit_amount: totalPrice * 100,
        },
        quantity: 1,
      },
    ];
    const session =
      await stripeInstance.checkout.sessions.create({
        line_items,
        mode: "payment",
        success_url: `${origin}/loader/my-bookings`,
        cancel_url: `${origin}/my-bookings`,
        metadata: {
          bookingId,
        },
      });
    res.json({ success: true, url: session.url });
  } catch (error) {
    res.json({success:false, message: "Błąd transakcji"})
  }
};
