// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'

// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <>
//       <div>
//         <a href="https://vite.dev" target="_blank">
//           <img src={viteLogo} className="logo" alt="Vite logo" />
//         </a>
//         <a href="https://react.dev" target="_blank">
//           <img src={reactLogo} className="logo react" alt="React logo" />
//         </a>
//       </div>
//       <h1>Vite + React</h1>
//       <div className="card">
//         <button onClick={() => setCount((count) => count + 1)}>
//           count is {count}
//         </button>
//         <p>
//           Edit <code>src/App.jsx</code> and save to test HMR
//         </p>
//       </div>
//       <p className="read-the-docs">
//         Click on the Vite and React logos to learn more
//       </p>
//     </>
//   )
// }

// export default App




import "./App.css";
import React, { useState, useRef } from "react";

function App() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [gender, setGender] = useState("male");
  const [subjects, setSubjects] = useState({
    english: true,
    maths: false,
    physics: false,
  });
  const [resume, setResume] = useState(null);
  const fileRef = useRef(null);
  const [url, setUrl] = useState("");
  const [selectedOption, setSelectedOption] = useState("");
  const [about, setAbout] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState(null);
  const [submittedData, setSubmittedData] = useState(null);

  const handleSubjectChange = (sub) => {
    setSubjects((prev) => ({
      ...prev,
      [sub]: !prev[sub],
    }));
  };

  const handleReset = () => {
    setFirstName("");
    setLastName("");
    setEmail("");
    setContact("");
    setGender("male");
    setSubjects({
      english: true,
      maths: false,
      physics: false,
    });
    setResume(null);
    if (fileRef.current) fileRef.current.value = "";
    setUrl("");
    setSelectedOption("");
    setAbout("");
    setMessage(null);
    setSubmittedData(null);
  };

  const validate = () => {
    if (!firstName.trim()) return "Please enter first name.";
    if (!lastName.trim()) return "Please enter last name.";
    if (!email.trim()) return "Please enter an email.";
    if (!contact.trim()) return "Please enter contact number.";
    if (!url.trim()) return "Please enter URL.";
    if (!selectedOption) return "Please pick an option from select.";
    if (!about.trim()) return "Please write something about yourself.";
    // resume is required in original form — keep that
    if (!resume) return "Please upload your resume (file).";
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);

    const error = validate();
    if (error) {
      setMessage({ type: "error", text: error });
      return;
    }

    // Build a friendly summary object for UI
    const summary = {
      firstName,
      lastName,
      email,
      contact,
      gender,
      selectedOption,
      subjects,
      resumeName: resume ? resume.name : null,
      url,
      about,
      submittedAt: new Date().toLocaleString(),
    };

    setSubmitting(true);
    setMessage({ type: "info", text: "Submitting..." });

    try {
      // Prepare FormData to show how you'd send file + fields to a backend
      const fd = new FormData();
      fd.append("firstName", firstName);
      fd.append("lastName", lastName);
      fd.append("email", email);
      fd.append("contact", contact);
      fd.append("gender", gender);
      fd.append("selectedOption", selectedOption);
      fd.append("subjects", JSON.stringify(subjects));
      fd.append("url", url);
      fd.append("about", about);
      if (resume) fd.append("resume", resume);

      // Demo: send to jsonplaceholder (doesn't actually save files, but shows fetch usage)
      const res = await fetch("https://jsonplaceholder.typicode.com/posts", {
        method: "POST",
        body: fd,
      });

      if (!res.ok) throw new Error("Network response was not ok");

      const responseJson = await res.json();

      setSubmittedData({ summary, serverResponse: responseJson });
      setMessage({ type: "success", text: "Form submitted successfully!" });
    } catch (err) {
      setMessage({
        type: "error",
        text: "Submission failed. (Demo endpoint may reject file uploads.)",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="App">
      <h1>Form</h1>

      <fieldset>
        <form onSubmit={handleSubmit} noValidate>
          <label htmlFor="firstname">First Name*</label>
          <input
            type="text"
            name="firstname"
            id="firstname"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="Enter First Name"
            required
          />

          <label htmlFor="lastname">Last Name*</label>
          <input
            type="text"
            name="lastname"
            id="lastname"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder="Enter Last Name"
            required
          />

          <label htmlFor="email">Enter Email*</label>
          <input
            type="email"
            name="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter email"
            required
          />

          <label htmlFor="contact">Contact*</label>
          <input
            type="tel"
            name="contact"
            id="contact"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            placeholder="Enter Mobile number"
            required
          />

          <label className="section-label">Gender*</label>
          <div className="inline-group">
            <label className="inline-label" htmlFor="male">
              <input
                type="radio"
                name="gender"
                value="male"
                id="male"
                checked={gender === "male"}
                onChange={(e) => setGender(e.target.value)}
              />
              Male
            </label>

            <label className="inline-label" htmlFor="female">
              <input
                type="radio"
                name="gender"
                value="female"
                id="female"
                checked={gender === "female"}
                onChange={(e) => setGender(e.target.value)}
              />
              Female
            </label>

            <label className="inline-label" htmlFor="other">
              <input
                type="radio"
                name="gender"
                value="other"
                id="other"
                checked={gender === "other"}
                onChange={(e) => setGender(e.target.value)}
              />
              Other
            </label>
          </div>

          <label className="section-label">Your best Subject</label>
          <div className="inline-group">
            <label className="inline-label" htmlFor="english">
              <input
                type="checkbox"
                name="lang"
                id="english"
                checked={subjects.english === true}
                onChange={() => handleSubjectChange("english")}
              />
              English
            </label>

            <label className="inline-label" htmlFor="maths">
              <input
                type="checkbox"
                name="lang"
                id="maths"
                checked={subjects.maths === true}
                onChange={() => handleSubjectChange("maths")}
              />
              Maths
            </label>

            <label className="inline-label" htmlFor="physics">
              <input
                type="checkbox"
                name="lang"
                id="physics"
                checked={subjects.physics === true}
                onChange={() => handleSubjectChange("physics")}
              />
              Physics
            </label>
          </div>

          <label htmlFor="file">Upload Resume*</label>
          <input
            type="file"
            name="file"
            id="file"
            ref={fileRef}
            onChange={(e) => setResume(e.target.files[0] || null)}
            required
          />
          {resume && (
            <div className="file-info">Selected: {resume.name}</div>
          )}

          <label htmlFor="url">Enter URL*</label>
          <input
            type="url"
            name="url"
            id="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://example.com"
            required
          />

          <label htmlFor="select">Select your choice</label>
          <select
            name="select"
            id="select"
            value={selectedOption}
            onChange={(e) => setSelectedOption(e.target.value)}
            required
          >
            <option value="" disabled>
              Select your Ans
            </option>
            <optgroup label="Beginners">
              <option value="1">HTML</option>
              <option value="2">CSS</option>
              <option value="3">JavaScript</option>
            </optgroup>
            <optgroup label="Advance">
              <option value="4">React</option>
              <option value="5">Node</option>
              <option value="6">Express</option>
              <option value="t">MongoDB</option>
            </optgroup>
          </select>

          <label htmlFor="about">About</label>
          <textarea
            name="about"
            id="about"
            cols="30"
            rows="4"
            value={about}
            onChange={(e) => setAbout(e.target.value)}
            placeholder="About yourself"
            required
          ></textarea>

          <div className="button-row">
            <button
              type="button"
              onClick={handleReset}
              className="btn reset"
              disabled={submitting}
            >
              Reset
            </button>

            <button
              type="submit"
              className="btn submit"
              disabled={submitting}
            >
              {submitting ? "Submitting..." : "Submit"}
            </button>
          </div>
        </form>
      </fieldset>

      {message && (
        <div className={`msg ${message.type}`}>{message.text}</div>
      )}

      {submittedData && (
        <div className="summary">
          <h3>Submission Summary</h3>
          <pre>{JSON.stringify(submittedData.summary, null, 2)}</pre>
          <details>
            <summary>Server response (demo)</summary>
            <pre>{JSON.stringify(submittedData.serverResponse, null, 2)}</pre>
          </details>
        </div>
      )}
    </div>
  );
}

export default App;