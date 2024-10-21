// src/app/approved-articles/page.tsx
"use client"; // Ensure the component is a Client Component

import { useEffect, useState } from 'react';

// Define the article interface
interface Article {
  _id: string;
  title: string;
  authors: string[];
  source: string;
  year: number;
  pages: number;
  doi: string;
  status: string;
}

const ApprovedArticlesPage = () => {
  const [articles, setArticles] = useState<Article[]>([]);

  // Fetch only approved articles from the API on component mount
  useEffect(() => {
    const fetchApprovedArticles = async () => {
      try {
        const response = await fetch('/api/articles?status=Approved'); // Query for only approved articles
        if (!response.ok) {
          throw new Error('Failed to fetch approved articles');
        }
        const data: Article[] = await response.json();
        setArticles(data);
      } catch (error) {
        console.error('Error fetching approved articles:', error);
      }
    };

    fetchApprovedArticles();
  }, []);

  return (
    <div style={{ padding: '20px', backgroundColor: '#000', color: '#fff' }}>
      <h1 style={{ color: '#fff', fontSize: '2rem', fontWeight: 'bold' }}>Approved Articles</h1>
      <p>Page containing a table of approved articles:</p>
      <table style={{ tableLayout: 'fixed', width: '100%', borderCollapse: 'collapse', color: '#fff' }}>
        <thead>
          <tr>
            <th>Title</th>
            <th>Authors</th>
            <th>Source</th>
            <th>Publication Year</th>
            <th>Pages</th>
            <th>DOI</th>
          </tr>
        </thead>
        <tbody>
          {articles.map((article) => (
            <tr key={article._id} style={{ borderBottom: '1px solid #fff' }}>
              <td style={{ paddingTop: '15px', paddingBottom: '15px' }}>{article.title}</td>
              <td style={{ paddingRight: '15px' }}>
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
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ApprovedArticlesPage;
