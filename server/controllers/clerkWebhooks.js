import User from "../models/User.js";
import { Webhook } from "svix";
import connectDB from "../configs/db.js";

const clerkWebhooks = async (req, res) => {
  try {
    await connectDB();

    const wh = new Webhook(process.env.CLERK_WEBHOOK_SECRET);
    const payload = req.body.toString("utf8");
    const headers = {
      "svix-id": req.headers["svix-id"],
      "svix-timestamp": req.headers["svix-timestamp"],
      "svix-signature": req.headers["svix-signature"],
    };

    const evt = wh.verify(payload, headers);

    console.log("Webhook fired!");
    console.log("Event type:", evt.type);
    console.log("Event data:", JSON.stringify(evt.data, null, 2));

    const { data, type } = evt;

    const userData = {
      _id: data.id,
      email: data.email_addresses?.[0]?.email_address || "",
      username: `${data.first_name || ""} ${data.last_name || ""}`.trim(),
      image: data.image_url || "",
    };

    console.log("Data to save to Mongo:", userData);

    let mongoResult;
    switch (type) {
      case "user.created":
        mongoResult = await User.create(userData);
        break;

      case "user.updated":
        mongoResult = await User.findByIdAndUpdate(data.id, userData, { upsert: true, new: true });
        break;

      case "user.deleted":
        mongoResult = await User.findByIdAndDelete(data.id);
        break;

      default:
        console.log("Unknown event type:", type);
        break;
    }

    console.log("Mongo operation result:", mongoResult);

    res.status(200).json({ success: true });
  } catch (err) {
    console.error("Clerk webhook error:", err.message);
    res.status(400).json({ success: false, error: err.message });
  }
};

export default clerkWebhooks;
