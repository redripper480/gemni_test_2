document.getElementById('contentForm').addEventListener('submit', async (event) => {
  event.preventDefault();
  const formData = new FormData(event.target); // Create a FormData object from the form
  const resultDiv = document.getElementById('result');
  resultDiv.innerHTML = 'Generating content...';
  
  const data = {};
  formData.forEach((value, key) => {
    data[key] = value;
  });
  console.log(data);

  try {
    const response = await fetch('http://localhost:3000/generate_article', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();
    resultDiv.innerHTML = result.article;
  } catch (error) {
    resultDiv.textContent = "There was an error generating the article. Please Try again"
  }
});



