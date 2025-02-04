import { NextApiRequest, NextApiResponse } from 'next';

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

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const callbackData: CallbackData = req.body;
        console.log('Callback Data:', callbackData);

        // Process the callback data
        if (callbackData.Result.ResultCode === '0') {
            // Transaction successful
            console.log('Transaction successful:', callbackData.Result);
            // Extract and use relevant data
            const transactionID = callbackData.Result.TransactionID;
            const amount = callbackData.Result.ResultParameters.ResultParameter.find(param => param.Key === 'Amount')?.Value;
            // Update your database or application state
        } else {
            // Transaction failed
            console.log('Transaction failed:', callbackData.Result);
            // Handle the failure case
        }

        res.status(200).send('Callback received');
    } else {
        res.status(405).send('Method Not Allowed');
    }
}
