import React from "react";
import { useFormik } from "formik";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

async function addEmployee(credentials) {
  return fetch("http://localhost:8080/add-employee", {
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
  }

  if (!values.email) {
    errors.email = "Required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Invalid email address";
  }

  if (!values.designation) {
    errors.designation = "Required";
  }

  return errors;
};

const AddEmployee = () => {
  const token = useSelector((store) => store.auth.token);
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      designation: "",
    },
    validate,
    onSubmit: async (values) => {
      const token = await addEmployee(values);
      if (token !== null) {
        alert(token);
      }
      formik.resetForm();
    },
  });

  if (token === null) {
    return (
      <div className="flex-row">
        <h1>It seems that your are not logged in!</h1>
        <Link to={"/auth"} className="nav-btn">
          Head over here to Login
        </Link>
      </div>
    );
  }
  return (
    <div className="add-employee">
      <form onSubmit={formik.handleSubmit} className="form">
        <h2>Add Employee</h2>
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
          id="designation"
          name="designation"
          placeholder="Designation"
          type="text"
          className="input"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.designation}
        />
        {formik.errors.designation ? (
          <div>{formik.errors.designation}</div>
        ) : null}

        <button type="submit" className="nav-btn">
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddEmployee;
