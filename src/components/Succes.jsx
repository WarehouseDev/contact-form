import img from "../assets/icon-success-check.svg";

export default function Success({ contactData }) {
  const { firstName, lastName, email, query, message } = contactData;

  return (
    <aside className="success-container">
      <h2>
        <img src={img} alt="check" /> <span>Message Sent!</span>
      </h2>
      <p>Thanks for completing the form. We'll be in touch soon!</p>
      <div className="contact-data">
        <h3>Contact Info:</h3>
        <p>
          <strong>First Name:</strong> {firstName}
        </p>
        <p>
          <strong>Last Name:</strong> {lastName}
        </p>
        <p>
          <strong>Email Address:</strong> {email}
        </p>
        <p>
          <strong>Query Type:</strong> {query}
        </p>
        <p>
          <strong>Message:</strong> {message}
        </p>
      </div>
    </aside>
  );
}
