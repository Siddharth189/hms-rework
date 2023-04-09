import React from "react";
import { useFormik } from "formik";

async function cancelBooking(bookingId) {
  return fetch(`http://localhost:8080/delete-booking/${bookingId}`, {
    method: "DELETE",
  }).then((data) => data.json());
}

const validate = (values) => {
  const errors = {};

  if (!values.bookingId) {
    errors.bookingId = "Required";
  }

  return errors;
};

const CancelBookingForm = () => {
  const formik = useFormik({
    initialValues: {
      bookingId: "",
    },
    validate,
    onSubmit: async (values) => {
      const result = await cancelBooking(values.bookingId);
      //   console.log("Delete => ", result);
      alert(result.message);
    },
  });
  return (
    <div className="cancel-booking">
      <form onSubmit={formik.handleSubmit} className="form">
        <h2>CANCEL BOOKING</h2>
        <input
          id="bookingId"
          name="bookingId"
          type="text"
          placeholder="Booking ID"
          className="input"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.bookingId}
        />
        {formik.errors.bookingId ? <div>{formik.errors.bookingId}</div> : null}

        <button type="submit" className="nav-btn">
          Cancel Booking
        </button>
      </form>
    </div>
  );
};

export default CancelBookingForm;
