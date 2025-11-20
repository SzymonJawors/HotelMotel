import stripe from "stripe";
import connectDB from "../configs/db.js";
import Booking from "../models/Booking.js";

export const stripeWebhooks = async (req, res) => {
  const stripeInstance = new stripe(
    process.env.STRIPE_SECRET_KEY
  );
  const sig = req.headers["stripe-signature"];
  let event;
  try {
    connectDB();
    event = stripeInstance.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    res.status(400).send(`Error: ${err.message}`);
  }
  if (event.type === "payment_intent.succeeded") {
    const paymentIntent = event.data.object;
    const paymentIntentId = paymentIntent.id;
    const session =
      await stripeInstance.checkout.sessions.list({
        payment_intent: paymentIntentId,
      });
    const { bookingId } = session.data[0].metadata;
    await Booking.findByIdAndUpdate(bookingId, {
      isPaid: true,
      paymentMethod: "Stripe",
    });
  } else {
    console.log("Wystąpił bład :", event.type);
  }
  res.json({ received: true });
};
