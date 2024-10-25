import React from 'react'
import { Button } from '../ui/button';
import { IEvent } from '@/lib/database/models/event.model';

const Checkout = ({ event, userId }: { event: IEvent, userId: string }) => {
    const onCheckout = async () => {
        const order ={
            eventTitle: event.title,
            eventId: event._id,
            buyerId: userId,
            isFree: event.isFree,
            price: event.price,
        }

        // await checkoutOrder(order);
    }
    return (
        <form action={onCheckout} method='post'>
            <Button
            type='submit'
            role='link'
            size='lg'
            className='button sm:fit'
            >
                {event.isFree ? "Get Ticket" : "Buy Ticket"}
            </Button>
        </form>
    )
}

export default Checkout