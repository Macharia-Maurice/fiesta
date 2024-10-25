'use client'
import React, { useState } from 'react';

const MPesaForm = () => {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [amount, setAmount] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const response = await fetch('/api/mpesa/initiate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    phoneNumber,
                    amount: parseFloat(amount),
                }),
            });

            const data = await response.json();

            if (data.success) {
                setMessage('Payment initiated successfully. Please check your phone.');
            } else {
                setMessage(`Error: ${data.message}`);
            }
        } catch (error) {
            console.error('Error initiating payment:', error);
            setMessage('Failed to initiate payment. Please try again.');
        }
    };

    return (
        <div>
            <h1>MPESA Payment</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="phoneNumber">Phone Number:</label>
                    <input
                        type="tel"
                        id="phoneNumber"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="amount">Amount:</label>
                    <input
                        type="number"
                        id="amount"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Pay with MPESA</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default MPesaForm;
