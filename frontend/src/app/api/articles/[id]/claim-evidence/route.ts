// src/app/api/articles/[id]/claim-evidence/route.ts
import { connectToDatabase } from '../../../../utils/mongodb';
import { ObjectId } from 'mongodb';
import { NextResponse } from 'next/server';

// PATCH: Save or update claim and evidence for an article
export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  const { db } = await connectToDatabase();
  const { claim, evidence } = await req.json(); // Get claim and evidence from the request body

  try {
    const result = await db.collection('articles').updateOne(
      { _id: new ObjectId(params.id) },
      { $set: { claim: claim, evidence: evidence } } // Update claim and evidence
    );

    if (result.modifiedCount === 1) {
      return NextResponse.json({ message: 'Claim and evidence saved successfully' }, { status: 200 });
    } else {
      return NextResponse.json({ message: 'Article not found' }, { status: 404 });
    }
  } catch (error) {
    console.error('Error saving claim and evidence:', error);
    return NextResponse.json({ message: 'Failed to save claim and evidence' }, { status: 500 });
  }
}
