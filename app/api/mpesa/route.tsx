import { NextRequest, NextResponse } from 'next/server';

type ResultParameter = {
    Key: string;
    Value: string;
};

type ReferenceItem = {
    Key: string;
    Value: string;
};

type CallbackData = {
    Result: {
        ResultType: string;
        ResultCode: string;
        ResultDesc: string;
        OriginatorConversationID: string;
        ConversationID: string;
        TransactionID: string;
        ResultParameters: {
            ResultParameter: ResultParameter[];
        };
        ReferenceData: {
            ReferenceItem: ReferenceItem[];
        };
    };
};

// In-memory storage for callback data
const transactions: CallbackData[] = [];

export async function POST(request: NextRequest) {
    try {
        const callbackData: CallbackData = await request.json();
        console.log('Callback Data:', callbackData);

        // Store the callback data in memory
        transactions.push(callbackData);

        // Process the callback data
        if (callbackData.Result.ResultCode === '0') {
            console.log('Transaction successful:', callbackData.Result);
        } else {
            console.log('Transaction failed:', callbackData.Result);
        }

        return NextResponse.json({ message: 'Callback received' }, { status: 200 });
    } catch (error) {
        console.error('Error processing callback:', error);
        return NextResponse.json({ message: 'Error processing callback' }, { status: 500 });
    }
}

// Endpoint to fetch all transactions
export async function GET(request: NextRequest) {
    try {
        return NextResponse.json(transactions, { status: 200 });
    } catch (error) {
        console.error('Error fetching transactions:', error);
        return NextResponse.json({ message: 'Error fetching transactions' }, { status: 500 });
    }
}