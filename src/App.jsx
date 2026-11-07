import { useState, useEffect } from "react";
import "./App.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuoteLeft } from "@fortawesome/free-solid-svg-icons/faQuoteLeft";
import { faTwitter, faTumblr } from "@fortawesome/free-brands-svg-icons";

function App() {
  const [quote, setQuote] = useState("");
  const [author, setAuthor] = useState("");
  const [color, setColor] = useState("#16a085");
  const [visible, setVisible] = useState(true);

  async function getQuote() {
    setVisible(false);
    await new Promise((resolve) => setTimeout(resolve, 300));

    try {
      const response = await fetch("https://dummyjson.com/quotes/random");

      if (!response.ok) {
        throw new Error("Failed to fetch quote");
      }
      const data = await response.json();

      setQuote(data.quote);
      setAuthor(data.author);

      const colors = [
        "#16a085",
        "#27ae60",
        "#2c3e50",
        "#f39c12",
        "#e74c3c",
        "#9b59b6",
        "#FB6964",
        "#342224",
        "#472E32",
        "#BDBB99",
        "#77B1A9",
        "#73A857",
        "#3498db",
        "#8e44ad",
        "#d35400",
        "#1abc9c",
        "#34495e",
        "#c0392b",
        "#7f8c8d",
        "#e67e22",
      ];
      const randomColor = colors[Math.floor(Math.random() * colors.length)];

      setColor(randomColor);
    } catch (error) {
      console.error("Error fetching quote:", error);
    } finally {
      setVisible(true);
    }
  }

  useEffect(() => {
    getQuote();
  }, []);

  return (
    <div id="body" style={{ "--main-color": color }}>
      <div id="quote-box" style={{ "--main-color": color }}>
        <div className="quote-content">
          <p id="text" style={{ opacity: visible ? 1 : 0 }}>
            <FontAwesomeIcon icon={faQuoteLeft} /> {quote}
          </p>

          <p id="author" style={{ opacity: visible ? 1 : 0 }}>
            - {author}
          </p>

          <div className="buttons">
            <div className="social-buttons">
              <a
                id="tweet-quote"
                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(`"${quote}" - ${author}`)}`}
                target="_blank"
                rel="noreferrer"
              >
                <FontAwesomeIcon icon={faTwitter} />
              </a>
              <a
                id="tumblr-quote"
                href={`https://www.tumblr.com/widgets/share/tool?posttype=quote&quote=${encodeURIComponent(quote)}&caption=${encodeURIComponent(author)}`}
                target="_blank"
                rel="noreferrer"
              >
                <FontAwesomeIcon icon={faTumblr} />
              </a>
            </div>
            <button id="new-quote" type="button" onClick={getQuote}>
              New Quote
            </button>
          </div>
        </div>
      </div>

      <p className="credit">Inspired by hezag</p>
    </div>
  );
}

export default App;
