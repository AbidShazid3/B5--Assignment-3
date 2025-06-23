import { model, Schema } from "mongoose";
import { IBorrow } from "../interfaces/borrow.interface";


const borrowSchema = new Schema<IBorrow>({
    book: {
        type: Schema.Types.ObjectId,
        ref: 'Book',
        required: [true, 'Book Id is required']
    },
    quantity: {
        type: Number,
        required: [true, "Quantity is required"],
        min: [1, "At least 1 copy must be borrowed and positive number"],
        validate: {
            validator: Number.isInteger,
            message: "Quantity must be positive integer number"
        }

    },
    dueDate: {
        type: Date,
        required: [true, "Due date is required"]
    }
}, { versionKey: false, timestamps: true })


export const Borrow = model<IBorrow>('Borrow', borrowSchema);