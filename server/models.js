const mongoose = require("mongoose");

// Define User schema
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

// Define Room schema
const roomSchema = new mongoose.Schema({
  roomType: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String },
  imageUrl: { type: String },
  avgRating: { type: Number, default: 0 },
  // other properties you want to include
});

// Define Employee Schema
const employeeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  designation: { type: String, required: true },
  joiningDate: { type: Date, default: Date.now },
  presentToday: { type: Boolean, default: false },
});

const bookingSchema = new mongoose.Schema({
  bookId: { type: String },
  roomId: { type: mongoose.Schema.Types.ObjectId, ref: "Room", required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  checkIn: { type: Date, required: true },
  checkOut: { type: Date, required: true },
});

// Create Booking model
const Booking = mongoose.model("Booking", bookingSchema);

// Create Employee model
const Employee = mongoose.model("Employee", employeeSchema);

// Create User model
const User = mongoose.model("User", userSchema);

// Create Room model
const Room = mongoose.model("Room", roomSchema);

module.exports = {
  User,
  Room,
  Employee,
  Booking,
};
