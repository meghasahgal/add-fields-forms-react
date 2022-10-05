import { useState, useEffect } from "react";

function ContactUs(props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [comments, setComments] = useState("");
  const [phoneType, setPhoneType] = useState("");
  const [validationErrors, setValidationErrors] = useState([]);
  // default value of user submitting anything is false
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const onSubmit = (e) => {
    e.preventDefault();
    // add setHasSubmitted to true once user has submtted
    setHasSubmitted(true);
    //if submitted incorrectly, return the alert
    if (validationErrors.length) return alert("Cannot submit!");

    const contactUsInformation = {
      name,
      email,
      phone,
      comments,
      phoneType,
      submittedOn: new Date(),
    };

    console.log(contactUsInformation);
    setName("");
    setEmail("");
    setPhone("");
    setComments("");
    setPhoneType("");
    // reset values to initial state after submission
    setValidationErrors([]);
    setHasSubmitted(false);
  };
  //on every change to name and email, is it passing the problems/conditions
  useEffect(() => {
    //intermediary here and valid. errors above
    const errors = [];
    if (!name.length) {
      errors.push("Please enter your name");
    }
    if (email.includes("@")) {
      errors.push("Please provide a valid Email");
    }
    //pass in errors array to setValidationErrors, which is function to update
    setValidationErrors(errors);
  }, [name, email]);

  return (
    <div>
      <h2>Contact Us</h2>
      {/* checking if there are errors in the validationErrors array */}
      {hasSubmitted && validationErrors.length > 0 && (
        <div>
          The following errors were found:
          <ul>
            {validationErrors.map((error) => (
              <li key={error}>{error}</li>
            ))}
          </ul>
        </div>
      )}
      <form onSubmit={onSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            id="name"
            type="text"
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            id="email"
            type="text"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>
        <div>
          <label htmlFor="phone">Phone:</label>
          <input
            id="phone"
            type="text"
            onChange={(e) => setPhone(e.target.value)}
            value={phone}
          />
          <select
            name="phoneType"
            onChange={(e) => setPhoneType(e.target.value)}
            value={phoneType}
          >
            <option value="" disabled>
              Select a phone type...
            </option>
            <option value="Home">Home</option>
            <option value="Work">Work</option>
            <option value="Mobile">Mobile</option>
          </select>
        </div>
        <div>
          <label htmlFor="comments">Comments:</label>
          <textarea
            id="comments"
            name="comments"
            onChange={(e) => setComments(e.target.value)}
            value={comments}
          />
        </div>
        <button>Submit</button>
      </form>
    </div>
  );
}

export default ContactUs;
