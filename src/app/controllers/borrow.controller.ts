import express, { NextFunction, Request, Response } from 'express'
import { Borrow } from '../models/borrow.model';
import { Book } from '../models/book.model';

export const borrowRoutes = express.Router();

borrowRoutes.post('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const data = req.body;
        await Book.borrowBook(data.book, data.quantity)
        const borrow = await Borrow.create(data);

        res.status(201).json({
            success: true,
            message: "Book borrowed successfully",
            data: borrow
        })
    } catch (error) {
        next(error)
    }
})

borrowRoutes.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {

        const borrow = await Borrow.aggregate([
            {
                $lookup: {
                    from: "books",
                    localField: "book",
                    foreignField: "_id",
                    as: "bookData"

                }
            },
            {
                $unwind: "$bookData"
            },
            {
                $group: {
                    _id: "$book",
                    totalQuantity: { $sum: "$quantity" },
                    book: {$first: "$bookData"}
                }
            },
            {
                $project: {
                    _id: 0,
                    book: {
                        title: "$book.title",
                        isbn: "$book.isbn"
                    },
                    totalQuantity: 1
                }
            }
        ]);

        res.status(201).json({
            success: true,
            message: "Borrowed books summary retrieved successfully",
            data: borrow
        })
    } catch (error) {
        next(error)
    }
})