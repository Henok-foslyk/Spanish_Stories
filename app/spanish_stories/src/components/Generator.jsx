import { useState } from "react";
import axios from "axios";

function Generator() {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [audioUrl, setAudioUrl] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!title || !text) {
      alert("Please enter both title and story text.");
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post("http://localhost:5001/generate", {
        title,
        text,
        audioUrl,
      });
      console.log("Story saved:", res.data);
      setSubmitted(true);
    } catch (err) {
      console.error("Failed to submit story:", err);
      alert("Failed to save story. See console for details.");
    }
    setLoading(false);
  };

  return (
    <div style={{ maxWidth: "600px", marginTop: "2rem" }}>
      <h2>Submit Spanish Story</h2>

      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Story Title"
        style={{ width: "100%", padding: "0.5rem", marginBottom: "1rem" }}
      />

      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Story text here..."
        rows={8}
        style={{ width: "100%", padding: "0.5rem" }}
      />

      <input
        value={audioUrl}
        onChange={(e) => setAudioUrl(e.target.value)}
        placeholder="Audio file URL (optional)"
        style={{ width: "100%", padding: "0.5rem", marginTop: "1rem" }}
      />

      <button onClick={handleSubmit} style={{ marginTop: "1rem" }} disabled={loading}>
        {loading ? "Submitting..." : "Submit Story"}
      </button>

      {submitted && (
        <div style={{ marginTop: "2rem" }}>
          <h3>{title}</h3>
          <p>{text}</p>
          {audioUrl && <audio controls src={audioUrl} style={{ width: "100%" }} />}
        </div>
      )}
    </div>
  );
}

export default Generator;
