// src/app/articles/new/page.tsx
"use client";  // Required to use client-side features like useState and form handling

import { useState, FormEvent } from "react";

const NewArticleForm = () => {
  const [title, setTitle] = useState("");
  const [authors, setAuthors] = useState("");
  const [journal, setJournal] = useState("");
  const [year, setYear] = useState<number | undefined>();
  const [doi, setDoi] = useState("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!title || !authors || !journal || !year || !doi) {
      alert("All fields are required!");
      return;
    }

    const newArticle = { title, authors, journal, year, doi };

    try {
      const response = await fetch("/api/articles", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newArticle),
      });

      if (response.ok) {
        alert("Article submitted successfully!");
        setTitle("");
        setAuthors("");
        setJournal("");
        setYear(undefined);
        setDoi("");
      } else {
        alert("Failed to submit article.");
      }
    } catch (error) {
      console.error("Error submitting article:", error);
      alert("Error submitting article.");
    }
  };

  return (
    <div>
      <h1>Submit a New Article</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <label htmlFor="authors">Authors:</label>
        <input
          type="text"
          id="authors"
          value={authors}
          onChange={(e) => setAuthors(e.target.value)}
        />

        <label htmlFor="journal">Journal:</label>
        <input
          type="text"
          id="journal"
          value={journal}
          onChange={(e) => setJournal(e.target.value)}
        />

        <label htmlFor="year">Year of Publication:</label>
        <input
          type="number"
          id="year"
          value={year || ""}
          onChange={(e) => setYear(parseInt(e.target.value))}
        />

        <label htmlFor="doi">DOI:</label>
        <input
          type="text"
          id="doi"
          value={doi}
          onChange={(e) => setDoi(e.target.value)}
        />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default NewArticleForm;
