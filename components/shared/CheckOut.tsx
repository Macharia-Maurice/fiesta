import React from 'react'
import { Button } from '../ui/button';
import { IEvent } from '@/lib/database/models/event.model';

const CheckOut = ({ event, userId }: { event: IEvent, userId: string }) => {
    const onCheckOut = async () => {
        console.log('Checking out');
    }
    return (
        <form action={onCheckOut} method='post'>
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

export default CheckOut