import React from "react";
import { useFormik } from "formik";

async function bookRoom(credentials) {
  return fetch("http://localhost:8080/book-room", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  }).then((data) => data.json());
}

const validate = (values) => {
  const errors = {};

  if (!values.roomId) {
    errors.roomId = "Required";
  }

  if (!values.userId) {
    errors.userId = "Required";
  }

  if (!values.checkIn) {
    errors.checkIn = "Required";
  }

  if (!values.checkOut) {
    errors.checkOut = "Required";
  }

  return errors;
};

const CreateBookingForm = () => {
  const formik = useFormik({
    initialValues: {
      roomId: "",
      userId: "",
      checkIn: "",
      checkOut: "",
    },
    validate,
    onSubmit: async (values) => {
      values["bookId"] = Date.now().toString();
      const bookings = [values]; // create an array of booking objects
      console.log(bookings);
      const result = await bookRoom(bookings);
      if (result !== null) {
        alert("Booking has been created successfully!!");
      }
    },
  });
  return (
    <div className="booking">
      <form onSubmit={formik.handleSubmit} className="form">
        <h2>BOOK A ROOM</h2>
        <input
          id="roomId"
          name="roomId"
          type="text"
          placeholder="Room ID"
          className="input"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.roomId}
        />
        {formik.errors.roomId ? <div>{formik.errors.roomId}</div> : null}

        <input
          id="userId"
          name="userId"
          type="text"
          placeholder="User ID"
          className="input"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.userId}
        />
        {formik.errors.userId ? <div>{formik.errors.userId}</div> : null}

        <input
          id="checkIn"
          name="checkIn"
          type="date"
          placeholder="Check-in date"
          className="input"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.checkIn}
        />
        {formik.errors.checkIn ? <div>{formik.errors.checkIn}</div> : null}

        <input
          id="checkOut"
          name="checkOut"
          type="date"
          placeholder="Check-out date"
          className="input"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.checkOut}
        />
        {formik.errors.checkOut ? <div>{formik.errors.checkOut}</div> : null}

        <button type="submit" className="nav-btn">
          Submit
        </button>
      </form>
    </div>
  );
};

export default CreateBookingForm;
