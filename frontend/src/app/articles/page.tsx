// src/app/articles/page.tsx (Server Component)
import { connectToDatabase } from '../utils/mongodb';
import InteractiveButtons from './InteractiveButtons'; // Import the client component

const ArticlesPage = async () => {
  const { db } = await connectToDatabase();
  const articles = await db.collection('articles').find().toArray();

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
            <th>Further Actions</th>
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
                <InteractiveButtons articleId={article._id.toString()} /> {/* Client Component */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ArticlesPage;
