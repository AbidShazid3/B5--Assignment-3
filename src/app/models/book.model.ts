import { model, Schema } from "mongoose";
import { IBook } from "../interfaces/book.interface";


const bookSchema = new Schema<IBook>({
    title: {
        type: String,
        required: [true, 'Book title is required'],
        trim: true,
    },
    author: {
        type: String,
        required: [true, 'Author is required'],
        trim: true,
    },
    genre: {
        type: String,
        required: [true, 'Genre is required'],
        trim: true,
        enum: {
            values: ['FICTION', 'NON_FICTION', 'SCIENCE', 'HISTORY', 'BIOGRAPHY', 'FANTASY'],
            message: 'got {VALUE} is not a valid genre. Must be one of: FICTION, NON_FICTION, SCIENCE, HISTORY, BIOGRAPHY, FANTASY'
        },
        uppercase: true,
    },
    isbn: {
        type: String,
        required: [true, 'ISBN is required'],
        unique: [true, 'ISBN matched, Give unique ISBN']
    },
    description: {
        type: String,
        trim: true,
    },
    copies: {
        type: Number,
        required: [true, "Number of copies is required"],
        min: [0, "Copies must be a positive number"],
        validate: {
            validator: Number.isInteger,
            message: "Copies must be positive integer number"
        }
    },
    available: {
        type: Boolean,
        default: true
    }
}, { versionKey: false, timestamps: true })

export const Book = model<IBook>('Book', bookSchema);