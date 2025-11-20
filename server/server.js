import express from "express";
import "dotenv/config";
import cors from "cors";
import connectDB from "./configs/db.js";
import { clerkMiddleware } from "@clerk/express";
import clerkWebhooks from "./controllers/clerkWebhooks.js";
import bodyParser from "body-parser";
import userRouter from "./routes/userRoutes.js";
import hotelRouter from "./routes/hotelRoutes.js";
import roomRouter from "./routes/roomRoutes.js";
import bookingRouter from "./routes/bookingRoutes.js";
import { stripeWebhooks } from "./controllers/stripeWebhooks.js";

connectDB();

const app = express();
app.use(cors());

app.post(
  "/api/stripe",
  express.raw({ type: "application/json" }),
  stripeWebhooks
);

app.post(
  "/api/clerk/webhook",
  bodyParser.raw({ type: "application/json" }),
  clerkWebhooks
);

app.use(express.json());
app.use(clerkMiddleware());

app.get("/", (req, res) => res.send("API DZIAŁA"));
app.use("/api/user", userRouter);
app.use("/api/hotels", hotelRouter);
app.use("/api/rooms", roomRouter);
app.use("/api/bookings", bookingRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () =>
  console.log(`Server działa na porcie ${PORT}`)
);
