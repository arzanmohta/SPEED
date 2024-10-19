// src/app/articles/page.tsx
"use client"; // Ensure the component is a Client Component

import { useEffect, useState } from 'react';
import InteractiveButtons from './InteractiveButtons';

const ArticlesPage = () => {
  const [articles, setArticles] = useState([]);

  // Fetch articles from the API on component mount
  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await fetch('/api/articles');
        if (!response.ok) {
          throw new Error('Failed to fetch articles');
        }
        const data = await response.json();
        setArticles(data);
      } catch (error) {
        console.error('Error fetching articles:', error);
      }
    };

    fetchArticles();
  }, []);

  // Handle article deletion
  const handleDelete = (id: string) => {
    setArticles((prevArticles) => prevArticles.filter((article: any) => article._id.toString() !== id));
  };

  return (
    <div style={{ padding: '20px', backgroundColor: '#000', color: '#fff' }}>
      <h1 style={{ color: '#fff', fontSize: '2rem', fontWeight: 'bold' }}>Articles Index Page</h1>
      <p>Page containing a table of articles:</p>
      <table style={{ tableLayout: 'fixed', width: '100%', borderCollapse: 'collapse', color: '#fff' }}>
        <thead>
          <tr>
            <th>Title</th>
            <th>Authors</th>
            <th>Source</th>
            <th>Publication Year</th>
            <th>Pages</th>
            <th>DOI</th>
            <th>Status</th>
            <th>Further Action</th>
          </tr>
        </thead>
        <tbody>
          {articles.map((article: any) => (
            <tr key={article._id.toString()} style={{ borderBottom: '1px solid #fff' }}>
              <td style={{ paddingTop: '15px', paddingBottom: '15px'}}>{article.title}</td>
              <td style={{ paddingRight: '15px'}}>
                {Array.isArray(article.authors) 
                  ? article.authors.join(', ')
                  : article.authors}
              </td>
              <td>{article.source || article.source}</td>
              <td>{article.year || article.year}</td>
              <td>{article.pages || article.pages}</td>
              <td>
                {article.doi 
                  ? <a href={article.doi} style={{ color: '#4CAF50' }}>{article.doi}</a>
                  : article.doi}
              </td>
              <td>{article.status || "Pending"}</td>
              <td>
                <InteractiveButtons articleId={article._id.toString()} onDelete={handleDelete} /> {/* Pass handleDelete */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ArticlesPage;
