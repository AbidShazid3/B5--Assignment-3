import { model, Schema } from "mongoose";
import { BookStaticMethods, IBook } from "../interfaces/book.interface";


const bookSchema = new Schema<IBook, BookStaticMethods>({
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

bookSchema.static('borrowBook', async function (bookId: string, quantity: number) {
    const book = await this.findById(bookId)

    if (!book) throw new Error('Book not found');
    if (book.copies < quantity) throw new Error('Not enough copies available');

    book.copies = book.copies - quantity;
    if (book.copies === 0) {
        book.available = false
    }

    await book.save();
    return book;
})

export const Book = model<IBook, BookStaticMethods>('Book', bookSchema);