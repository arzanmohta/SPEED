// src/app/api/articles/route.ts
import { connectToDatabase } from '../../utils/mongodb';
import { NextResponse } from 'next/server';

// GET: Fetch articles, optionally filtering by status
export async function GET(req: Request) {
  const { db } = await connectToDatabase();
  const url = new URL(req.url);
  const status = url.searchParams.get('status'); // Get the status from the query string (if any)

  let filter = {};
  if (status) {
    filter = { status: status }; // Only filter by status if it's provided
  }

  try {
    const articles = await db.collection('articles').find(filter).toArray();
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
