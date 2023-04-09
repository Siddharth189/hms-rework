import React from "react";
import { useFormik } from "formik";

async function registerUser(credentials) {
  return fetch("http://localhost:8080/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  }).then((data) => data.json());
}

const validate = (values) => {
  const errors = {};

  if (!values.name) {
    errors.name = "Required";
  } else if (values.name.length > 15) {
    errors.name = "Must be 15 characters or less";
  }

  if (!values.password) {
    errors.password = "Required";
  } else if (values.password.length < 8) {
    errors.password = "Password length must me atleast 8";
  }

  if (!values.email) {
    errors.email = "Required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Invalid email address";
  }

  return errors;
};

const CreateGuestForm = () => {
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    validate,
    onSubmit: async (values) => {
      const token = await registerUser(values);
      if (token !== null) {
        alert(
          "Guest Information has been added to database succesfully",
          token
        );
      }
    },
  });
  return (
    <div className="register">
      <form onSubmit={formik.handleSubmit} className="form">
        <h2>FILL THE FORM USING GUEST DATA</h2>
        <input
          id="name"
          name="name"
          type="text"
          placeholder="Name"
          className="input"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.name}
        />
        {formik.errors.name ? <div>{formik.errors.name}</div> : null}

        <input
          id="email"
          name="email"
          type="email"
          placeholder="john@gmail.com"
          className="input"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.email}
        />
        {formik.errors.email ? <div>{formik.errors.email}</div> : null}

        <input
          id="password"
          name="password"
          placeholder="password"
          type="text"
          className="input"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.password}
        />
        {formik.errors.password ? <div>{formik.errors.password}</div> : null}

        <button type="submit" className="nav-btn">
          Submit
        </button>
      </form>
    </div>
  );
};

export default CreateGuestForm;
