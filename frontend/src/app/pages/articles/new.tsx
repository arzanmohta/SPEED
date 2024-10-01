// pages/articles/new.tsx
import { useState, FormEvent } from "react";
import formStyles from "../../styles/Form.module.scss"; // Custom styling

const NewArticleForm = () => {
  const [title, setTitle] = useState("");
  const [authors, setAuthors] = useState("");
  const [journal, setJournal] = useState("");
  const [year, setYear] = useState<number | undefined>();
  const [doi, setDoi] = useState("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Form validation
    if (!title || !authors || !journal || !year || !doi) {
      alert("All fields are required!");
      return;
    }

    // Submission logic
    const newArticle = { title, authors, journal, year, doi };

    // Make a POST request to the backend (or placeholder for now)
    const response = await fetch("/api/articles", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newArticle),
    });

    if (response.ok) {
      alert("Article submitted successfully!");
      // Optionally clear the form
      setTitle("");
      setAuthors("");
      setJournal("");
      setYear(undefined);
      setDoi("");
    } else {
      alert("Failed to submit article.");
    }
  };

  return (
    <div className="container">
      <h1>Submit a New Article</h1>
      <form className={formStyles.form} onSubmit={handleSubmit}>
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          name="title"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <label htmlFor="authors">Authors:</label>
        <input
          type="text"
          name="authors"
          id="authors"
          value={authors}
          onChange={(e) => setAuthors(e.target.value)}
        />

        <label htmlFor="journal">Journal:</label>
        <input
          type="text"
          name="journal"
          id="journal"
          value={journal}
          onChange={(e) => setJournal(e.target.value)}
        />

        <label htmlFor="year">Year of Publication:</label>
        <input
          type="number"
          name="year"
          id="year"
          value={year || ""}
          onChange={(e) => setYear(parseInt(e.target.value))}
        />

        <label htmlFor="doi">DOI:</label>
        <input
          type="text"
          name="doi"
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
