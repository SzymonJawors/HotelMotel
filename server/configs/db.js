import mongoose from "mongoose";

const connectDB = async () => {
  try {
    mongoose.connection.on("connected", () =>
      console.log("Połączono z mongodb")
    );
    await mongoose.connect(
      `${process.env.MONGODB_URI}/hotelmotel`
    );
  } catch (error) {
    console.log(error.message);
  }
};

export default connectDB;
