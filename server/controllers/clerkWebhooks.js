import User from "../models/User.js";
import { Webhook } from "svix";
import connectDB from "../configs/db.js";

const clerkWebhooks = async (req, res) => {
  try {
    await connectDB();

    const wh = new Webhook(
      process.env.CLERK_WEBHOOK_SECRET
    );
    const payload = req.body.toString("utf8");
    const headers = {
      "svix-id": req.headers["svix-id"],
      "svix-timestamp": req.headers["svix-timestamp"],
      "svix-signature": req.headers["svix-signature"],
    };

    const evt = wh.verify(payload, headers);
    const { data, type } = evt;

    const userData = {
      _id: data.id,
      clerkId: data.id,
      email: data.email_addresses?.[0]?.email_address || "",
      username: `${data.first_name || ""} ${
        data.last_name || ""
      }`.trim(),
      image: data.image_url || "",
    };

    switch (type) {
      case "user.created":
        await User.create(userData);
        break;

      case "user.updated":
        await User.findByIdAndUpdate(data.id, userData, {
          upsert: true,
          new: true,
        });
        break;

      case "user.deleted":
        await User.findOneAndDelete({ clerkId: data.id });
        break;

      default:
        break;
    }

    res.status(200).json({ success: true });
  } catch (err) {
    console.error(err.message);
    res
      .status(400)
      .json({ success: false, error: err.message });
  }
};

export default clerkWebhooks;
