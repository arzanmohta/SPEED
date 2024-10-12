import React, { useEffect, useState } from 'react';

const ModerationQueue = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const fetchArticles = async () => {
      const response = await fetch('/api/moderation-queue');
      const data = await response.json();
      setArticles(data);
    };

    fetchArticles();
  }, []);

  const approveArticle = async (id) => {
    const response = await fetch(`/api/articles/${id}/approve`, {
      method: 'POST',
    });
    if (response.ok) {
      setArticles(articles.filter((article) => article.id !== id));
    }
  };

  const rejectArticle = async (id) => {
    const response = await fetch(`/api/articles/${id}/reject`, {
      method: 'POST',
    });
    if (response.ok) {
      setArticles(articles.filter((article) => article.id !== id));
    }
  };

  return (
    <div>
      <h2>Moderation Queue</h2>
      <ul>
        {articles.map((article) => (
          <li key={article.id}>
            <p>{article.title}</p>
            <button onClick={() => approveArticle(article.id)}>Approve</button>
            <button onClick={() => rejectArticle(article.id)}>Reject</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ModerationQueue;
