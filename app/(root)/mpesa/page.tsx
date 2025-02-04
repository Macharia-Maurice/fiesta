// /app/transactions/page.tsx

import Link from 'next/link';

type Transaction = {
    Result: {
        ResultType: string;
        ResultCode: string;
        ResultDesc: string;
        OriginatorConversationID: string;
        ConversationID: string;
        TransactionID: string;
        ResultParameters: {
            ResultParameter: { Key: string; Value: string }[];
        };
        ReferenceData: {
            ReferenceItem: { Key: string; Value: string }[];
        };
    };
};

export default async function TransactionsPage() {
    // Fetch data from the API route
    const response = await fetch("https://fiesta-murex.vercel.app/api/mpesa", {
        cache: 'no-store', // Disable caching to always fetch fresh data
    });

    if (!response.ok) {
        throw new Error('Failed to fetch transactions');
    }

    const transactions: Transaction[] = await response.json();

    return (
        <div>
            <h1>Transactions</h1>
            {transactions.length > 0 ? (
                <ul>
                    {transactions.map((transaction, index) => (
                        <li key={index}>
                            <strong>Transaction ID:</strong> {transaction.Result.TransactionID},{' '}
                            <strong>Amount:</strong> $
                            {transaction.Result.ResultParameters.ResultParameter.find(
                                (param) => param.Key === 'Amount'
                            )?.Value},{' '}
                            <strong>Status:</strong> {transaction.Result.ResultDesc}
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No transactions found.</p>
            )}
            <Link href="/">Back to Home</Link>
        </div>
    );
}