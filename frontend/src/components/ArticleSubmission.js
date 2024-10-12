import React, { useState } from 'react';

const ArticleSubmission = () => {
  const [article, setArticle] = useState({
    title: '',
    link: '',
    journal: '',
    conference: '',
  });

  const handleChange = (e) => {
    setArticle({
      ...article,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('/api/articles', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(article),
    });
    if (response.ok) {
      alert('Article submitted for moderation!');
      setArticle({ title: '', link: '', journal: '', conference: '' });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="title"
        placeholder="Article Title"
        value={article.title}
        onChange={handleChange}
        required
      />
      <input
        type="url"
        name="link"
        placeholder="Article Link"
        value={article.link}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="journal"
        placeholder="Journal"
        value={article.journal}
        onChange={handleChange}
      />
      <input
        type="text"
        name="conference"
        placeholder="Conference"
        value={article.conference}
        onChange={handleChange}
      />
      <button type="submit">Submit Article</button>
    </form>
  );
};

export default ArticleSubmission;
