// src/app/api/articles/route.ts
import { connectToDatabase } from '../../utils/mongodb';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { title, authors, source, year, pages, doi } = await request.json();

  if (!title || !authors || !source || !year || !pages || !doi) {
    return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
  }

  const { db } = await connectToDatabase();

  const article = {
    title,
    authors,
    source,
    year,
    pages,
    doi,
  };

  try {
    await db.collection('articles').insertOne(article);
    return NextResponse.json({ message: 'Article created successfully' }, { status: 201 });
  } catch (error) {
    console.error('Error creating article:', error);
    return NextResponse.json({ message: 'Failed to create article' }, { status: 500 });
  }
}
