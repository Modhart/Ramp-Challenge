import React, { useEffect, useState } from "react";
import "./styles.css";

export default App = () => {
  const [message, setMessage] = useState("");
  const [displayedText, setDisplayText] = useState("");
  const [index, setIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFlag = async () => {
      try {
        const response = await fetch(
          "https://wgg522pwivhvi5gqsn675gth3q0otdja.lambda-url.us-east-1.on.aws/6a6f63"
        );
        console.log("response", response);
        const text = await response.text();
        console.log(text);
        setMessage(text.trim());
      } catch (error) {
        console.error("Error fetching the flag:", error);
        setMessage("Error loading word.");
      } finally {
        setLoading(false);
      }
    };

    fetchFlag();
  }, []);

  useEffect(() => {
    let i = 0;
    console.log("message", message);
    const typingInterval = setInterval(() => {
      if (i < message.length) {
        setDisplayText((prevText) => prevText + message.charAt(index));
        setIndex((prevIndex) => prevIndex + 1);
      } else {
        clearInterval(typingInterval);
      }
    }, 500);

    return () => {
      clearInterval(typingInterval);
    };
  }, [message, index]);

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {displayedText.split("").map((char, index) => (
            <li key={index}>{char}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

// javascript:(function(){const collectedCharacters=[...document.querySelectorAll('section[data-id^="92"] > article[data-class$="45"] > div[data-tag*="78"] > b.ref')].map(b=>b.getAttribute('value')).join('');alert("Extracted URL: " + collectedCharacters);})();
