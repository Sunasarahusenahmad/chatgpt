import React, { useState } from "react";
import axios from "axios";

const App = () => {
  const [file, setFile] = useState(null);
  const [query, setQuery] = useState("");
  const [response, setResponse] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleQueryChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file || !query) {
      alert("Please provide a file and query.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("query", query);

    try {
      const res = await axios.post("http://localhost:5000/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setResponse(res.data.extractedData);
    } catch (err) {
      console.error(err);
      alert("Error processing the file.");
    }
  };

  return (
    <div>
      <h1>Document Data Extractor</h1>
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={handleFileChange} />
        <input
          type="text"
          placeholder="Enter your query"
          value={query}
          onChange={handleQueryChange}
        />
        <button type="submit">Submit</button>
      </form>

      {response && (
        <div>
          <h2>Extracted Data:</h2>
          <pre>{response}</pre>
        </div>
      )}
    </div>
  );
};

export default App;
