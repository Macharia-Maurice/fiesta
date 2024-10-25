// src/app/api/mpesa/callback/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const callbackData = await req.json();

    console.log('M-PESA Callback Data:', callbackData);

    // Process the callback data (e.g., update your database based on transaction success or failure)
    // You can implement your custom logic here, like checking transaction status and updating the DB.

    return NextResponse.json({ message: 'Callback received successfully' });
  } catch (error) {
    console.error('Error processing M-PESA callback:', error);
    return NextResponse.json({ message: 'Failed to process callback' }, { status: 500 });
  }
}
