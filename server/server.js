const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const { User, Room, Employee, Booking } = require("./models");

const app = express();
app.use(cors());
const port = 8080;

// Connect to MongoDB
const dbURL =
  "mongodb+srv://siddharth:7s3XnilcOgUSNFEs@cluster0.xg2bger.mongodb.net/userDB?retryWrites=true&w=majority";
mongoose
  .connect(dbURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.log("Error connecting to MongoDB", error);
  });

// Middleware
app.use(bodyParser.json());

// Register endpoint
app.post("/register", async (req, res) => {
  try {
    // Check if email already exists
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // Hash the password
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    // Create the user
    const newUser = new User({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
    });
    await newUser.save();

    // Create and sign the JWT token
    const token = jwt.sign({ userId: newUser._id }, "secret_key");
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// Login endpoint
app.post("/login", async (req, res) => {
  try {
    // Check if email exists
    const user = await User.findOne({ email: req.body.email });
    console.log("User => ", user);
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Check if password is correct
    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!validPassword) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Create and sign the JWT token
    const token = jwt.sign({ userId: user._id }, "secret_key");
    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// Delete endpoint
app.post("/delete-user", async (req, res) => {
  try {
    const userId = req.body.userId;
    console.log("User => ", userId);
    // Check if user exists
    const user = await User.findOne({ _id: userId });
    if (!user) {
      return res.status(400).json({ message: "User with id ${id} not found" });
    }

    // Remove user from database
    await User.deleteOne({ _id: userId });

    res
      .status(200)
      .json({ message: "User with id ${id} has been deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// Update endpoint
app.post("/update-user", async (req, res) => {
  try {
    const { id, name, email, password } = req.body;
    // validate inputs and throw an error if necessary

    // Hash the password
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    // update user in the database
    const result = await User.updateOne(
      { _id: id },
      { name, email, password: hashedPassword }
    );

    if (result.acknowledged) {
      res.status(200).json(`User with id ${id} has been updated successfully!`);
    } else {
      res.status(400).json(`User with id ${id} not found.`);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Api Endpoint To Add an Employee
app.post("/add-employee", async (req, res) => {
  try {
    const { name, email, designation } = req.body;
    // validate inputs and throw an error if necessary
    const joiningDate = new Date().toISOString().slice(0, 10);

    // create employee in the database
    const employee = new Employee({ name, email, designation, joiningDate });
    await employee.save();

    res
      .status(200)
      .json(`Employee ${employee.name} has been added successfully!`);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Api Endpoint To Remove Employees
app.delete("/remove-employee/:id", async (req, res) => {
  try {
    const { id } = req.params;

    // remove employee from the database
    const result = await Employee.deleteOne({ _id: id });

    if (result.deletedCount === 1) {
      res
        .status(200)
        .json(`Employee with id ${id} has been removed successfully!`);
    } else {
      res.status(400).json(`Employee with id ${id} not found.`);
    }
  } catch (error) {
    const errorMsg = error.message;
    res.status(500).json(errorMsg);
  }
});

// Api Endpoint Mark the Attendance of an Employees
app.post("/mark-attendance/:id", async (req, res) => {
  try {
    const { id } = req.params;

    // Check if employee with given id is already marked present today
    const isPresentToday = await Employee.exists({
      _id: id,
      presentToday: true,
    });

    if (isPresentToday) {
      res
        .status(400)
        .json(`Employee with id ${id} is already marked present today.`);
      return;
    }

    // Update the employee with id to mark them as present today
    const result = await Employee.updateOne(
      { _id: id },
      { $set: { presentToday: true } }
    );

    if (result.acknowledged) {
      res
        .status(200)
        .json(`Employee with id ${id} has been marked as present today.`);
    } else {
      res.status(400).json(`Employee with id ${id} not found.`);
    }
  } catch (error) {
    const errorMsg = error.message;
    res.status(500).json(errorMsg);
  }
});

// Api Endpoint To See present Employees
app.get("/get-today-employees", async (req, res) => {
  try {
    // Find all employees with presentToday set to true
    const employees = await Employee.find({ presentToday: true });

    // Return the list of employees
    res.status(200).json(employees);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Api Endpoint To See All Employees
app.get("/get-all-employees", async (req, res) => {
  try {
    // get all employees from the database
    const employees = await Employee.find();
    console.log("Employees => ", employees);
    res.status(200).json(employees);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post("/add-rooms", async (req, res) => {
  try {
    // Create new Room object with data from request body
    const newRoom = new Room({
      roomType: req.body.type,
      price: req.body.price,
      description: req.body.description,
      imageUrl: req.body.imageUrl,
    });
    // Save new Room object to database
    const savedRoom = await newRoom.save();
    // Return success message with saved Room object as JSON
    res.status(200).json("Room information has been added successfully!");
  } catch (err) {
    // Return error message with status code 400 if room creation fails
    const error = err.message;
    res.status(400).json(error);
  }
});

app.delete("/remove-room/:id", async (req, res) => {
  try {
    const room = await Room.findByIdAndDelete(req.params.id);
    if (!room) {
      return res.status(404).json("Room not found");
    }
    res.status(200).json("Room removed successfully");
  } catch (error) {
    console.error(error);
    res.status(500).json("Internal server error");
  }
});

app.post("/update-room", async (req, res) => {
  try {
    const { id, type, price, description, imageUrl } = req.body;
    // validate inputs and throw an error if necessary

    // update user in the database
    const result = await Room.updateOne(
      { _id: id },
      { roomType: type, price, description, imageUrl }
    );

    if (result.acknowledged) {
      res.status(200).json(`Room with id ${id} has been updated successfully!`);
    } else {
      res.status(400).json(`Room with id ${id} not found.`);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Api Endpoint To See All Rooms
app.get("/get-all-rooms", async (req, res) => {
  try {
    // get all employees from the database
    const rooms = await Room.find();
    console.log("Rooms => ", rooms);
    res.status(200).json(rooms);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// book-room
app.post("/book-room", async (req, res) => {
  const bookings = req.body;

  try {
    const savedBookings = [];
    for (const bookingData of bookings) {
      const { bookId, roomId, userId, checkIn, checkOut } = bookingData;
      const booking = new Booking({
        bookId,
        roomId,
        userId,
        checkIn,
        checkOut,
      });
      const savedBooking = await booking.save();
      savedBookings.push(savedBooking);
    }
    res
      .status(201)
      .json({ message: "Rooms booked successfully.", bookings: savedBookings });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error. Failed to book the room." });
  }
});

// Api Endpoint To See All Bookings
app.get("/get-all-bookings", async (req, res) => {
  try {
    // get all employees from the database
    const bookings = await Booking.find();
    console.log("Booking => ", bookings);
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Api Endpoint To delete a booking
app.delete("/delete-booking/:bookId", async (req, res) => {
  console.log("Delete => ", req.params.bookId);
  try {
    const booking = await Booking.findOneAndDelete({
      bookId: req.params.bookId,
    });
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }
    res.status(200).json({ message: "Booking deleted successfully", booking });
  } catch (error) {
    res.status(500).json({ message: "Server error. Failed to delete booking" });
  }
});

// API endpoint to update an booking
app.post("/update-booking", async (req, res) => {
  try {
    const { bookId, userId, roomId, checkIn, checkOut } = req.body;
    // validate inputs and throw an error if necessary

    // update user in the database
    const result = await Booking.updateOne(
      { bookId: bookId },
      { roomId, userId, checkIn, checkOut }
    );

    if (result.acknowledged) {
      res.status(200).json({
        message: `Booking with booking id ${bookId} has been updated successfully!`,
      });
    } else {
      res.status(400).json({ message: `Booking with id ${bookId} not found.` });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
