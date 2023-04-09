import React from "react";
import { useFormik } from "formik";

async function deleteUser(credentials) {
  return fetch("http://localhost:8080/delete-user", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ userId: credentials.id }),
  }).then((data) => data.json());
}

const validate = (values) => {
  const errors = {};

  if (!values.id) {
    errors.id = "Required";
  }

  return errors;
};

const RemoveGuestForm = () => {
  const formik = useFormik({
    initialValues: {
      id: "",
      email: "",
      password: "",
    },
    validate,
    onSubmit: async (values) => {
      const token = await deleteUser(values);
      alert(token.message);
    },
  });
  return (
    <div className="register">
      <form onSubmit={formik.handleSubmit} className="form">
        <h2>REMOVE A GUEST FROM DATABASE</h2>
        <input
          id="id"
          name="id"
          type="text"
          placeholder="id"
          className="input"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.id}
        />
        {formik.errors.id ? <div>{formik.errors.id}</div> : null}

        <button type="submit" className="nav-btn">
          Submit
        </button>
      </form>
    </div>
  );
};

export default RemoveGuestForm;
