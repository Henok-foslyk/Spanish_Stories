const express = require("express");
const cors = require("cors");
const admin = require("firebase-admin");
require("dotenv").config();

const app = express();

app.use(cors({
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "OPTIONS"],
  allowedHeaders: ["Content-Type"],
  credentials: true,
}));

app.use(express.json());
app.use("/audio", express.static("audio"));

const serviceAccount = require("./firebaseKey.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});
const db = admin.firestore();

// POST /generate now accepts full story data, no generation inside backend
app.post("/generate", async (req, res) => {
  const { title, text, audioUrl } = req.body;

  if (!title || !text) {
    return res.status(400).send("Missing title or text");
  }

  try {
    const story = {
      title,
      text,
      audioUrl: audioUrl || null,
      createdAt: new Date(),
    };

    await db.collection("stories").add(story);
    res.json(story);
  } catch (err) {
    console.error(err);
    res.status(500).send("Failed to save story.");
  }
});

app.listen(5001, () => {
  console.log("Server running on http://localhost:5001");
});
