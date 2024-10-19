// src/app/api/articles/route.ts
import { connectToDatabase } from '../../utils/mongodb';
import { NextResponse } from 'next/server';

export async function GET() {
  const { db } = await connectToDatabase();

  try {
    // Fetch all articles from the "articles" collection
    const articles = await db.collection('articles').find().toArray();
    return NextResponse.json(articles, { status: 200 });
  } catch (error) {
    console.error('Error fetching articles:', error);
    return NextResponse.json({ message: 'Failed to fetch articles' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  const { db } = await connectToDatabase();

  try {
    const newArticle = await req.json(); // Parse the request body as JSON
    // Insert the new article into the "articles" collection
    const result = await db.collection('articles').insertOne(newArticle);
    return NextResponse.json({ message: 'Article created', articleId: result.insertedId }, { status: 201 });
  } catch (error) {
    console.error('Error creating article:', error);
    return NextResponse.json({ message: 'Failed to create article' }, { status: 500 });
  }
}
