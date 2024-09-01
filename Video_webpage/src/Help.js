import React, { useState } from "react";

const HelpAndSupport = () => {
  const [showMessage, setShowMessage] = useState(false);

  const handleButtonClick = () => {
    setShowMessage(true);
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Help and Support</h2>
      <p style={styles.text}>
        If you need assistance with our services or have any questions, please
        refer to the frequently asked questions (FAQ) section or contact our
        support team.
      </p>
      <button style={styles.button} onClick={handleButtonClick}>
        Request Unmasked Data for Investigation
      </button>
      {showMessage && (
        <p style={styles.message}>
          Please send an email to{" "}
          <a href="mailto:support@trustedweartech.com">
            support@trustedweartech.com
          </a>{" "}
          to enable unmasked data. The email should be sent from a law
          enforcement government agency.
        </p>
      )}
    </div>
  );
};

const styles = {
  container: {
    padding: "20px",
    backgroundColor: "#f9f9f9",
    borderRadius: "8px",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
    Width: "100%",
    margin: "auto",
  },
  title: {
    fontSize: "24px",
    marginBottom: "15px",
  },
  text: {
    fontSize: "16px",
    marginBottom: "20px",
  },
  button: {
    padding: "10px 20px",
    fontSize: "16px",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    backgroundColor: "#007bff",
    color: "#fff",
    transition: "background-color 0.3s",
  },
  message: {
    marginTop: "20px",
    fontSize: "14px",
    color: "#333",
  },
};

export default HelpAndSupport;
