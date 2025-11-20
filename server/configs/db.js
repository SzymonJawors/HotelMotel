import mongoose from "mongoose";

const connectDB = async () => {
  if (mongoose.connections[0].readyState) {
    return;
  }

  try {
    await mongoose.connect(
      `${process.env.MONGODB_URI}/hotelmotel`
    );
    console.log("Nowe połączenie z MongoDB");
  } catch (error) {
    console.error("Błąd łączenia z DB:", error.message);
  }
};

export default connectDB;
