const express = require("express");
const mongoose = require("mongoose");
const {
  MONGO_PASSWORD,
  MONGO_USER,
  MONGO_IP,
  MONGO_PORT,
} = require("./config/connection");
const hotelRoutes = require("./routes/hotelRoutes.js");
const guestRoutes = require("./routes/guestRoutes.js");
const reservationRoutes = require("./routes/reservationRoutes.js");

const app = express();
app.use(express.json());

const mongoUrl = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}/pmweb-hotel?authSource=admin`;
mongoose.connect(mongoUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(hotelRoutes);
app.use(guestRoutes);
app.use(reservationRoutes);

app.listen(5000, () => {
  console.log("Server is running...");
});
