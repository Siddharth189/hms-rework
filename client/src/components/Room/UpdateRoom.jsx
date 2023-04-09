import React from "react";
import { useFormik } from "formik";

async function updateRoom(credentials) {
  return fetch("http://localhost:8080/update-room", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  }).then((data) => data.json());
}

const validate = (values) => {
  const errors = {};

  if (!values.id) {
    errors.id = "Required";
  }

  if (!values.type) {
    errors.type = "Required";
  }

  if (!values.price) {
    errors.price = "Required";
  }

  if (!values.description) {
    errors.description = "Required";
  }

  if (!values.imageUrl) {
    errors.imageUrl = "Required";
  }

  return errors;
};

const UpdateRoom = () => {
  const formik = useFormik({
    initialValues: {
      id: "",
      type: "",
      price: "",
      description: "",
      imageUrl: "",
    },
    validate,
    onSubmit: async (values) => {
      const token = await updateRoom(values);
      if (token !== null) {
        alert(token);
      }
      formik.resetForm();
    },
  });
  return (
    <div className="add-employee">
      <form onSubmit={formik.handleSubmit} className="form">
        <h2>Update Room Information</h2>
        <input
          id="id"
          name="id"
          type="text"
          placeholder="_id"
          className="input"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.id}
        />
        {formik.errors.id ? <div>{formik.errors.id}</div> : null}

        <input
          id="type"
          name="type"
          type="text"
          placeholder="NON-AC, SINGLE"
          className="input"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.type}
        />
        {formik.errors.type ? <div>{formik.errors.type}</div> : null}

        <input
          id="price"
          name="price"
          type="number"
          placeholder="1000.00"
          className="input"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.price}
        />
        {formik.errors.price ? <div>{formik.errors.price}</div> : null}

        <input
          id="description"
          name="description"
          placeholder="description"
          type="text"
          className="input"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.description}
        />
        {formik.errors.description ? (
          <div>{formik.errors.description}</div>
        ) : null}

        <input
          id="imageUrl"
          name="imageUrl"
          placeholder="httos://via.placeholder.io/150"
          type="url"
          className="input"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.imageUrl}
        />
        {formik.errors.imageUrl ? <div>{formik.errors.imageUrl}</div> : null}

        <button type="submit" className="nav-btn">
          Submit
        </button>
      </form>
    </div>
  );
};

export default UpdateRoom;
