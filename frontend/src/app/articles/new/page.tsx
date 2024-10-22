"use client";

import { useState } from 'react';
import Link from 'next/link';

const NewArticlePage = () => {
  const [title, setTitle] = useState('');
  const [authors, setAuthors] = useState(['']);
  const [source, setSource] = useState('');
  const [year, setYear] = useState(0);
  const [pages, setPages] = useState(0);
  const [doi, setDoi] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleAddAuthor = () => {
    setAuthors([...authors, '']);
  };

  const handleRemoveAuthor = (index: number) => {
    const newAuthors = [...authors];
    newAuthors.splice(index, 1);
    setAuthors(newAuthors);
  };

  const handleAuthorChange = (index: number, value: string) => {
    const newAuthors = [...authors];
    newAuthors[index] = value;
    setAuthors(newAuthors);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const articleData = { title, authors, source, year, pages, doi };

    try {
      const res = await fetch('/api/articles', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(articleData),
      });

      if (!res.ok) {
        const error = await res.json();
        setErrorMessage(error.message || 'Something went wrong');
        return;
      }

      // Clear form on success
      setTitle('');
      setAuthors(['']);
      setSource('');
      setYear(0);
      setPages(0);
      setDoi('');
      setErrorMessage('');
      setSuccessMessage('Article submitted successfully!');
    } catch {
      setErrorMessage('Failed to submit the article. Please try again.');
    }
  };

  return (
    <div style={{ padding: '20px', backgroundColor: '#000', color: '#fff' }}>
      <h1 style={{ color: '#fff', fontSize: '2rem', fontWeight: 'bold' }}>New Article</h1>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '10px' }}>
          <label>Title:</label>
          <input 
            type="text" 
            value={title} 
            onChange={(e) => setTitle(e.target.value)} 
            style={{ width: '99%', padding: '8px', marginTop: '5px', backgroundColor: '#b0b0b0'}} 
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>Authors:</label>
          {authors.map((author, index) => (
            <div key={index} style={{ display: 'flex', alignItems: 'center', marginTop: '5px' }}>
              <input 
                type="text" 
                value={author} 
                onChange={(e) => handleAuthorChange(index, e.target.value)} 
                style={{ flexGrow: 1, padding: '8px', backgroundColor: '#b0b0b0'}} 
              />
              {/* Show "+" button for the last author input and "-" for others */}
              {index === authors.length - 1 ? (
                <button type="button" onClick={handleAddAuthor} style={{ marginLeft: '10px', backgroundColor: '#b0b0b0' }}>+</button>
              ) : (
                <button type="button" onClick={() => handleRemoveAuthor(index)} style={{ marginLeft: '10px', backgroundColor: '#b0b0b0', width: '24px', textAlign: 'center'}}>-</button>
              )}
            </div>
          ))}
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>Source:</label>
          <input 
            type="text" 
            value={source} 
            onChange={(e) => setSource(e.target.value)} 
            style={{ width: '99%', padding: '8px', marginTop: '5px', backgroundColor: '#b0b0b0'}} 
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>Publication Year:</label>
          <input 
            type="number" 
            value={year} 
            onChange={(e) => setYear(parseInt(e.target.value))} 
            style={{ width: '99%', padding: '8px', marginTop: '5px', backgroundColor: '#b0b0b0'}} 
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>Pages:</label>
          <input 
            type="number" 
            value={pages} 
            onChange={(e) => setPages(parseInt(e.target.value))} 
            style={{ width: '99%', padding: '8px', marginTop: '5px', backgroundColor: '#b0b0b0'}} 
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>DOI:</label>
          <input 
            type="text" 
            value={doi} 
            onChange={(e) => setDoi(e.target.value)} 
            style={{ width: '99%', padding: '8px', marginTop: '5px', backgroundColor: '#b0b0b0'}} 
          />
        </div>
        <br />
        <button 
          type="submit" 
          style={{ padding: '10px 20px', backgroundColor: '#888', color: '#fff', border: 'none', cursor: 'pointer' }}
        >
          Submit
        </button>
      </form>
      <br></br>
      <br></br>
      <Link href="/articles" target="_blank" style={{ color: '#4CAF50', textDecoration: 'none', marginBottom: '20px', display: 'inline-block' }}>
        <u>View Unmoderated Articles</u>
      </Link>
    </div>
  );
};

export default NewArticlePage;
