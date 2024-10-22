// src/app/approved-articles/page.tsx
"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface Article {
  _id: string;
  title: string;
  authors: string[];
  source: string;
  year: number;
  pages: number;
  doi: string;
  status: string;
  claim?: string;
  evidence?: string;
}

const ApprovedArticlesPage = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [claims, setClaims] = useState<{ [key: string]: string }>({});
  const [evidence, setEvidence] = useState<{ [key: string]: string }>({});
  const router = useRouter();

  // Fetch approved articles and initialize claims and evidence states
  useEffect(() => {
    const fetchApprovedArticles = async () => {
      try {
        const response = await fetch('/api/articles?status=Approved');
        const data: Article[] = await response.json();
        setArticles(data);

        // Initialize claims and evidence with existing data
        const claimsObj: { [key: string]: string } = {};
        const evidenceObj: { [key: string]: string } = {};
        data.forEach(article => {
          claimsObj[article._id] = article.claim || '';
          evidenceObj[article._id] = article.evidence || '';
        });
        setClaims(claimsObj);
        setEvidence(evidenceObj);
      } catch (error) {
        console.error('Error fetching approved articles:', error);
      }
    };

    fetchApprovedArticles();
  }, []);

  // Handle claim input changes
  const handleClaimChange = (id: string, value: string) => {
    setClaims(prevClaims => ({ ...prevClaims, [id]: value }));
  };

  // Handle evidence input changes
  const handleEvidenceChange = (id: string, value: string) => {
    setEvidence(prevEvidence => ({ ...prevEvidence, [id]: value }));
  };

  // Handle save action and send updated claim and evidence to the backend
  const handleSave = async () => {
    try {
      // Save each article's claim and evidence
      for (const article of articles) {
        const articleId = article._id;
        const response = await fetch(`/api/articles/${articleId}/claim-evidence`, { // Ensure this path matches the API route
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            claim: claims[articleId] || '',
            evidence: evidence[articleId] || ''
          }),
        });

        if (!response.ok) {
          throw new Error('Failed to save claim and evidence');
        }
      }

      // Redirect to the final results page after saving
      router.push('/final-results');
    } catch (error) {
      console.error('Error saving claim and evidence:', error);
    }
  };

  return (
    <div style={{ padding: '20px', backgroundColor: '#000', color: '#fff' }}>
      <h1 style={{ color: '#fff', fontSize: '2rem', fontWeight: 'bold' }}>Approved Articles</h1>
      <p>Page containing a table of approved articles:</p>

      <Link href="/final-results" target="_blank" style={{ color: '#4CAF50', textDecoration: 'none', marginBottom: '20px', display: 'inline-block' }}>
        <u>View Final Articles</u>
      </Link>

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
              <td>
                <textarea
                  value={claims[article._id] || ''}
                  onChange={(e) => handleClaimChange(article._id, e.target.value)}
                  placeholder="Enter claim"
                  rows={1}
                  style={{
                    width: '100%',
                    padding: '8px',
                    backgroundColor: '#000',
                    color: '#fff',
                    textAlign: 'center',
                    resize: 'none',
                  }}
                />
              </td>
              <td>
                <textarea
                  value={evidence[article._id] || ''}
                  onChange={(e) => handleEvidenceChange(article._id, e.target.value)}
                  placeholder="Enter evidence"
                  rows={1}
                  style={{
                    width: '100%',
                    padding: '8px',
                    backgroundColor: '#000',
                    color: '#fff',
                    textAlign: 'center',
                    resize: 'none',
                  }}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <button
        onClick={handleSave}
        style={{
          padding: '10px 20px',
          backgroundColor: '#4CAF50',
          color: '#fff',
          border: 'none',
          cursor: 'pointer',
          marginTop: '20px',
        }}
      >
        Save and View Final Results
      </button>
    </div>
  );
};

export default ApprovedArticlesPage;
