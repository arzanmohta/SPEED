// src/app/final-results/page.tsx
"use client";

import { useEffect, useState } from 'react';

interface ArticleWithClaimEvidence {
  _id: string;
  title: string;
  authors: string[];
  source: string;
  year: number;
  pages: number;
  doi: string;
  status: string;
  claim: string;
  evidence: string;
}

const FinalResultsPage = () => {
  const [articles, setArticles] = useState<ArticleWithClaimEvidence[]>([]);

  useEffect(() => {
    const fetchFinalArticles = async () => {
      try {
        const response = await fetch('/api/articles?status=Approved');
        const data: ArticleWithClaimEvidence[] = await response.json();
        setArticles(data);
      } catch (error) {
        console.error('Error fetching final articles:', error);
      }
    };

    fetchFinalArticles();
  }, []);

  return (
    <div style={{ padding: '20px', backgroundColor: '#000', color: '#fff' }}>
      <h1 style={{ color: '#fff', fontSize: '2rem', fontWeight: 'bold' }}>Final Results</h1>
      <p>Page containing a table of final results with claim and evidence:</p>

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
              <td>{article.claim || "No Claim Provided"}</td>
              <td>{article.evidence || "No Evidence Provided"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FinalResultsPage;
