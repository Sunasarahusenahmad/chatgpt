const { OpenAI } = require("openai");
const openai = new OpenAI({
  apiKey:
    "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",
});

async function getAvailableModels() {
  try {
    const response = await openai.models.list(); // List available models
    console.log(response.data);
  } catch (error) {
    console.error("Error fetching models:", error);
  }
}

getAvailableModels();
