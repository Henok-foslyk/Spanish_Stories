const express = require("express");
const cors = require("cors");
const admin = require("firebase-admin");
const { execSync } = require("child_process");
const { v4: uuidv4 } = require("uuid");
const path = require("path");
require("dotenv").config();

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type"],
    credentials: true,
  })
);

app.use(express.json());

// Serve audio folder statically
app.use("/audio", express.static(path.join(__dirname, "audio")));

const serviceAccount = require("./firebaseKey.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});
const db = admin.firestore();

app.post("/generate", async (req, res) => {
  console.log("Received data:", req.body);
  const { title, text } = req.body;

  if (!title || !text) {
    return res.status(400).send("Missing title or text");
  }

  const id = uuidv4();
  const audioFilename = `${id}.mp3`;
  const audioFilePath = path.join(__dirname, "audio", audioFilename);

  try {
    // Call Python gtts_helper.py to generate audio file locally
    execSync(
      `python3 gtts_helper.py "${text.replace(/"/g, '\\"')}" "${audioFilePath}"`
    );

    const story = {
      title,
      text,
      audioFilename, // store filename only
      createdAt: new Date(),
    };

    await db.collection("stories").add(story);

    console.log("Story saved with audio filename:", story);
    res.json(story);
  } catch (err) {
    console.error("Error generating or saving audio:", err);
    res.status(500).send("Failed to generate story audio.");
  }
});

// Optional: add a GET endpoint to fetch stories if needed by frontend
app.get("/stories", async (req, res) => {
  try {
    const snapshot = await db
      .collection("stories")
      .orderBy("createdAt", "desc")
      .get();
    const stories = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    res.json(stories);
  } catch (err) {
    console.error("Error fetching stories:", err);
    res.status(500).send("Failed to fetch stories.");
  }
});

app.listen(5001, () => {
  console.log("Server running on http://localhost:5001");
});
