// pages/api/articles.ts
import { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "../../utils/mongodb"; // MongoDB connection utility

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const { title, authors, journal, year, doi } = req.body;

    // Validate required fields
    if (!title || !authors || !journal || !year || !doi) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    try {
      // Connect to MongoDB
      const { db } = await connectToDatabase();

      // Insert the new article into the "articles" collection
      const result = await db.collection("articles").insertOne({
        title,
        authors,
        journal,
        year,
        doi,
        status: "pending", // Mark the article as pending moderation
        createdAt: new Date(),
      });

      res.status(201).json({ message: "Article submitted", articleId: result.insertedId });
    } catch (error) {
      res.status(500).json({ error: "Database error", details: error });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
};
