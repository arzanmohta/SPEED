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
  const [claims, setClaims] = useState<{ [key: string]: string }>({}); // Track claims for each article
  const [evidence, setEvidence] = useState<{ [key: string]: string }>({}); // Track evidence for each article

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

  // Handle claim input changes
  const handleClaimChange = (id: string, value: string) => {
    setClaims((prevClaims) => ({
      ...prevClaims,
      [id]: value, // Update the claim for the specific article
    }));
  };

  // Handle evidence input changes
  const handleEvidenceChange = (id: string, value: string) => {
    setEvidence((prevEvidence) => ({
      ...prevEvidence,
      [id]: value, // Update the evidence for the specific article
    }));
  };

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
            <th>Claim</th>
            <th>Evidence</th>
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
              
              {/* Single-line Claim input column */}
              <td>
                <textarea
                  value={claims[article._id] || ''} // Display the current claim value
                  onChange={(e) => handleClaimChange(article._id, e.target.value)}
                  placeholder="Enter claim"
                  rows={1} // Single line height
                  style={{
                    width: '100%',
                    padding: '8px',
                    backgroundColor: '#000', // Black background
                    color: '#fff', // White text
                    textAlign: 'center', // Center text
                    resize: 'none', // Disable resizing
                  }}
                />
              </td>
              
              {/* Single-line Evidence input column */}
              <td>
                <textarea
                  value={evidence[article._id] || ''} // Display the current evidence value
                  onChange={(e) => handleEvidenceChange(article._id, e.target.value)}
                  placeholder="Enter evidence"
                  rows={1} // Single line height
                  style={{
                    width: '100%',
                    padding: '8px',
                    backgroundColor: '#000', // Black background
                    color: '#fff', // White text
                    textAlign: 'center', // Center text
                    resize: 'none', // Disable resizing
                  }}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ApprovedArticlesPage;
