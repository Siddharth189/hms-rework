import React from "react";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../utils/authSlice";

async function loginUser(credentials) {
  return fetch("http://localhost:8080/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  }).then((data) => data.json());
}

const validate = (values) => {
  const errors = {};

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

const Login = () => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validate,
    onSubmit: async (values) => {
      const token = await loginUser(values);
      dispatch(login(JSON.stringify(token)));
      console.log("Login => ", JSON.stringify(token));
    },
  });
  return (
    <div className="login">
      {token !== null ? (
        <div className="loading">
          <span className="check">&#10003;</span>
          <p>You have logged in</p>
        </div>
      ) : (
        <form onSubmit={formik.handleSubmit} className="form room-card">
          <h2>Login</h2>
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
      )}
    </div>
  );
};

export default Login;
