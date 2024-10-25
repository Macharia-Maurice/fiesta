'use server'

import { CheckoutOrderParams } from "@/types"
import { handleError } from "../utils"
import { connectToDatabase } from "../database"

export const checkoutOrder = async (order: CheckoutOrderParams) => {

    const price = order.isFree ? '0' : Number(order.price);
    
    try {
        
         
    } catch (error) {
        handleError(error);
    }
}