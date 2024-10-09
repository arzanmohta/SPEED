// src/app/articles/page.tsx
import { connectToDatabase } from "../utils/mongodb";
import { Article } from "../../types"; // Assuming you have types defined for the article

export const dynamic = "force-dynamic"; // Ensure the page is always dynamic

const ArticlesPage = async () => {
  const { db } = await connectToDatabase();
  const articles = await db.collection("articles").find().toArray(); // Fetch all articles

  return (
    <div>
      <p className="text-xl"><strong>Submitted Articles</strong></p><br />
      <ul>
        {articles.map((article: Article) => (
          <li key={article._id}>
            <strong>Title:</strong> {article.title}<br />
            <strong>Authors:</strong> {article.authors}<br />
            <strong>Journal:</strong> {article.journal}<br />
            <strong>Year:</strong> {article.year}<br />
            <strong>DOI:</strong> {article.doi}<br /><br />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ArticlesPage;
