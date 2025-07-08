const express = require("express");
const cors = require("cors");
const { execSync } = require("child_process");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");
const admin = require("firebase-admin");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());
app.use("/audio", express.static("audio"));  // serve audio files statically

// Initialize Firestore (no storage)
const serviceAccount = require("./firebaseKey.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});
const db = admin.firestore();

app.post("/generate", async (req, res) => {
  const { prompt } = req.body;
  const text = `Había una vez un ${prompt} que vivía en el bosque...`; // Use GPT API in production
  const id = uuidv4();
  const filepath = `audio/${id}.mp3`;

  try {
    // Call gTTS using Python script
    execSync(`python3 gtts_helper.py "${text.replace(/"/g, '\\"')}" "${filepath}"`);

    // Save to Firestore with URL to local server
    const story = {
      title: prompt,
      text,
      audioUrl: `http://localhost:5000/audio/${id}.mp3`,
      createdAt: new Date(),
    };

    await db.collection("stories").add(story);
    res.json(story);
  } catch (err) {
    console.error(err);
    res.status(500).send("Failed to generate story.");
  }
});

app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});
