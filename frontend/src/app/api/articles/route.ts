// src/app/api/articles/route.ts
import { NextResponse } from "next/server";
import { connectToDatabase } from "../../utils/mongodb"; // Your MongoDB connection utility

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { title, authors, journal, year, doi } = body;

    if (!title || !authors || !journal || !year || !doi) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const { db } = await connectToDatabase();

    const result = await db.collection("articles").insertOne({
      title,
      authors,
      journal,
      year,
      doi,
      status: "pending", // Mark as pending for moderation
      createdAt: new Date(),
    });

    return NextResponse.json({ message: "Article submitted successfully", articleId: result.insertedId });
  } catch (error) {
    console.error("Error submitting article:", error);
    return NextResponse.json({ error: "Database error" }, { status: 500 });
  }
}
