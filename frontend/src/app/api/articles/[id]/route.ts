// src/app/api/articles/[id]/route.ts
import { connectToDatabase } from '../../../utils/mongodb';
import { ObjectId } from 'mongodb';
import { NextResponse } from 'next/server';

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  const { db } = await connectToDatabase();

  try {
    // Delete the article by its ObjectId
    const result = await db.collection('articles').deleteOne({ _id: new ObjectId(params.id) });

    if (result.deletedCount === 1) {
      return NextResponse.json({ message: 'Article deleted successfully' }, { status: 200 });
    } else {
      return NextResponse.json({ message: 'Article not found' }, { status: 404 });
    }
  } catch (error) {
    console.error('Error deleting article:', error);
    return NextResponse.json({ message: 'Failed to delete article' }, { status: 500 });
  }
}
