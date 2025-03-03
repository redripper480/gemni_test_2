// Load environment variables from .env file
require('dotenv').config();

document.getElementById('contentForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const topic = document.getElementById('topic').value;
  const resultDiv = document.getElementById('result');

  // Clear previous results
  resultDiv.textContent = 'Generating content...';

  try {
    // Fetch content from Gemini API
    const response = await fetch('https://api.gemini.com/v1/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.GEMINI_API_KEY}`,
      },
      body: JSON.stringify({
        prompt: `Write a short article about ${topic}`,
        max_tokens: 100,
      }),
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    const data = await response.json();
    const generatedContent = data.choices[0].text;

    // Display the generated content
    resultDiv.textContent = generatedContent;
  } catch (error) {
    console.error(error);
    resultDiv.textContent = 'An error occurred while generating content.';
  }
});
