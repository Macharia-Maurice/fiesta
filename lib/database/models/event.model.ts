import { Document,model, models, Schema } from "mongoose";

export interface IEvent extends Document {
    _id: string;
    title: string;
    description?: string;
    location?: string;
    imageUrl: string;
    startDateTime: Date;
    endDateTime: Date;
    price?: string;
    isFree: boolean;
    url: string;
    createdAt: Date;
    category?: { _id: string; name: string };
    organizer?: { _id: string; firstName: string; lastName: string };
}


const EventSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String},
    location: { type: String },
    imageUrl: { type: String, required: true },
    startDateTime: { type: Date, required: true, default: Date.now },
    endDateTime: { type: Date, required: true, default: Date.now },
    categoryId: { type: String, required: true },
    price: { type: String},
    isFree: { type: Boolean, default: false},
    url: { type: String, required: true },
    createdAt:{type: Date, default: Date.now},
    category:{type: Schema.Types.ObjectId, ref: 'Category'},
    organizer:{type: Schema.Types.ObjectId, ref: 'User'},

})

const Event = models.Event || model("Event", EventSchema)

export default Event;
