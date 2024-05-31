import { useState } from "react";

const initialValues = {
  firstName: "",
  lastName: "",
  email: "",
  query: "",
  message: "",
  consent: false,
};

export default function Form({ onSuccess }) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});

  function handleChanges(e) {
    const { name, value, type, checked } = e.target;
    setValues((prevState) => ({
      ...prevState,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  function validateForm() {
    const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    let formErrors = {};

    if (values.firstName === "")
      formErrors.firstName = "This field is required";
    if (values.lastName === "") formErrors.lastName = "This field is required";
    if (values.message === "") formErrors.message = "This field is required";
    if (values.email === "") {
      formErrors.email = "This field is required";
    } else if (!values.email.match(regex)) {
      formErrors.email = "Please enter a valid email address";
    }
    if (!values.consent)
      formErrors.consent =
        "To submit this form, please consent to being contacted";
    if (!values.query) formErrors.query = "Please select a query type";

    setErrors(formErrors);

    return Object.keys(formErrors).length === 0;
  }

  function resetForm() {
    setValues(initialValues);
  }

  function submitForm(e) {
    e.preventDefault();
    if (validateForm()) {
      onSuccess(values);
      resetForm();
    }
  }

  return (
    <form onSubmit={submitForm}>
      {/* name */}
      <div className="name-container">
        <div className="form-control">
          <label htmlFor="firstName">First Name</label>
          <input
            type="text"
            id="firstName"
            className={errors.firstName ? "error" : undefined}
            name="firstName"
            value={values.firstName}
            onChange={handleChanges}
            aria-describedby="firstNameError"
          />
          {errors.firstName && (
            <p className="errorMsg" id="firstNameError" aria-live="assertive">
              {errors.firstName}
            </p>
          )}
        </div>
        <div className="form-control">
          <label htmlFor="lastName">Last Name</label>
          <input
            type="text"
            id="lastName"
            className={errors.lastName ? "error" : undefined}
            name="lastName"
            value={values.lastName}
            onChange={handleChanges}
            aria-describedby="lastNameError"
          />
          {errors.lastName && (
            <p className="errorMsg" id="lastNameError" aria-live="assertive">
              {errors.lastName}
            </p>
          )}
        </div>
      </div>
      {/* email */}
      <div className="form-control">
        <label htmlFor="email">Email Address</label>
        <input
          type="email"
          id="email"
          className={errors.email ? "error" : undefined}
          name="email"
          value={values.email}
          onChange={handleChanges}
          aria-describedby="emailError"
        />
        {errors.email && (
          <p className="errorMsg" id="emailError" aria-live="assertive">
            {errors.email}
          </p>
        )}
      </div>
      {/* query type */}
      <div className="form-control">
        <fieldset>
          <legend>Query Type</legend>
          <div className="radio-container">
            <div>
              <input
                type="radio"
                name="query"
                id="general"
                value="General Enquiry"
                checked={values.query === "General Enquiry"}
                onChange={handleChanges}
                aria-describedby="queryError"
              />
              <label htmlFor="general">General Enquiry</label>
            </div>
            <div>
              <input
                type="radio"
                name="query"
                id="support"
                value="Support Request"
                checked={values.query === "Support Request"}
                onChange={handleChanges}
                aria-describedby="queryError"
              />
              <label htmlFor="support">Support Request</label>
            </div>
          </div>
        </fieldset>
        {errors.query && (
          <p className="errorMsg" id="queryError" aria-live="assertive">
            {errors.query}
          </p>
        )}
      </div>
      {/* message */}
      <div className="form-control">
        <label htmlFor="message">Message</label>
        <textarea
          name="message"
          id="message"
          className={errors.message ? "error" : undefined}
          value={values.message}
          onChange={handleChanges}
          aria-describedby="messageError"
        ></textarea>
        {errors.message && (
          <p className="errorMsg" id="messageError" aria-live="assertive">
            {errors.message}
          </p>
        )}
      </div>
      {/* consent */}
      <div className="form-control">
        <div className="checkbox-container">
          <input
            type="checkbox"
            name="consent"
            id="consent"
            checked={values.consent}
            onChange={handleChanges}
            aria-describedby="consentError"
          />
          <label htmlFor="consent">
            I consent to being contacted by the team
          </label>
        </div>
        {errors.consent && (
          <p className="errorMsg" id="consentError" aria-live="assertive">
            {errors.consent}
          </p>
        )}
      </div>
      {/* submit */}
      <div className="form-control">
        <button type="submit">Submit</button>
      </div>
    </form>
  );
}
