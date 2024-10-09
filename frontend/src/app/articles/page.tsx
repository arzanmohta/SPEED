// src/app/articles/page.tsx
import { connectToDatabase } from "../utils/mongodb";
import { ObjectId } from "mongodb"; // Import ObjectId to handle the conversion

export const dynamic = "force-dynamic"; // Ensure the page is always dynamic

const ArticlesPage = async () => {
  const { db } = await connectToDatabase();
  const articles = await db.collection("articles").find().toArray(); // Fetch all articles

  return (
    <div>
      <p className="text-xl"><strong>Submitted Articles</strong></p><br />
      <ul>
        {articles.map((article) => (
          <li key={(article._id as ObjectId).toString()}> {/* Convert ObjectId to string */}
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
