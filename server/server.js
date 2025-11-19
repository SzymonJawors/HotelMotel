import express from "express";
import "dotenv/config";
import cors from "cors";
import connectDB from "./configs/db.js";
import { clerkMiddleware } from "@clerk/express";
import clerkWebhooks from "./controllers/clerkWebhooks.js";
import bodyParser from "body-parser";

connectDB();

const app = express();
app.use(cors());

app.post(
  "/api/clerk/webhook",
  bodyParser.raw({type: "application/json"}),
  clerkWebhooks
)


app.use(express.json());
app.use(clerkMiddleware());

app.get("/", (req, res) => res.send("API DZIAŁA"));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () =>
  console.log(`Server działa na porcie ${PORT}`)
);
