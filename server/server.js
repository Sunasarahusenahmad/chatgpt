const express = require("express");
const multer = require("multer");
const bodyParser = require("body-parser");
const fs = require("fs");
const { OpenAI } = require("openai"); // Correct import for new versions of OpenAI SDK
require("dotenv").config();

const app = express();
const upload = multer({ dest: "uploads/" });
const PORT = 5000;

// Initialize OpenAI client using OpenAI function (not constructor)
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // Make sure the API key is in .env
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Upload endpoint
app.post("/upload", upload.single("file"), async (req, res) => {
  try {
    const { query } = req.body;
    const filePath = req.file.path;

    // Read the uploaded file
    const fileContent = fs.readFileSync(filePath, "utf8");

    // Extract data using ChatGPT
    const completion = await openai.chat.completions.create({
      //   model: "gpt-4",
      model: "gpt-4o-mini",
      store: true,
      messages: [
        {
          role: "system",
          content:
            "You are a helpful assistant that extracts data from documents.",
        },
        {
          role: "user",
          content: `Extract the following information: ${query}. Here is the document:\n\n${fileContent}`,
        },
      ],
    });

    const extractedData = completion.choices[0].message.content;

    res.json({ extractedData });
  } catch (error) {
    console.error("Error processing file:", error.message || error);
    res.status(500).send("An error occurred while processing the file.");
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
