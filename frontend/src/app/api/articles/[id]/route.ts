// src/app/api/articles/[id]/route.ts
import { connectToDatabase } from '../../../utils/mongodb';
import { ObjectId } from 'mongodb';
import { NextResponse } from 'next/server';

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  const { db } = await connectToDatabase();

  try {
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

// PATCH: Update article status (Approve/Reject)
export async function PATCH(req: Request, { params }: { params: { id: string } }) {
    const { db } = await connectToDatabase();
    const { status } = await req.json(); // Extract the new status from the request body
  
    try {
      const result = await db.collection('articles').updateOne(
        { _id: new ObjectId(params.id) },
        { $set: { status: status } } // Update the article's status
      );
  
      if (result.modifiedCount === 1) {
        return NextResponse.json({ message: 'Status updated successfully' }, { status: 200 });
      } else {
        return NextResponse.json({ message: 'Article not found' }, { status: 404 });
      }
    } catch (error) {
      console.error('Error updating article status:', error);
      return NextResponse.json({ message: 'Failed to update article status' }, { status: 500 });
    }
  }