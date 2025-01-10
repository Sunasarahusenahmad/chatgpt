const axios = require('axios');

// Replace with your actual API key and CSE ID
const apiKey = 'AIzaSyBxapkK6dmAiGlr1ozM-SsO2I_aEXUc26Y'; 
const cx = 'd6966c300bc814097';

// Function to perform a Google Custom Search query
async function searchGoogle(query) {
  try {
    const url = `https://www.googleapis.com/customsearch/v1?q=${query}&key=${apiKey}&cx=${cx}`;

    // Send request to Google Custom Search API
    const response = await axios.get(url);

    // Print the full response to inspect it
    console.log(response.data);

    // Display the search results
    const items = response.data.items;
    if (items) {
      items.forEach((item, index) => {
        console.log(`Result ${index + 1}:`);
        console.log(`Title: ${item.title}`);
        console.log(`Link: ${item.link}`);
        console.log(`Snippet: ${item.snippet}`);
        console.log('---');
      });
    } else {
      console.log('No results found.');
    }
  } catch (error) {
    console.error('Error during search:', error.message);
  }
}

// Example query to search
searchGoogle("top 10 actress in india");
