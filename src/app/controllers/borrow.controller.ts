import express, { Request, Response } from 'express'
import { Borrow } from '../models/borrow.model';
import { Book } from '../models/book.model';

export const borrowRoutes = express.Router();

borrowRoutes.post('/', async (req: Request, res: Response) => {
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
        res.status(400).json({
            success: false,
            message: 'Validation failed',
            error
        })
    }
})

borrowRoutes.get('/', async (req: Request, res: Response) => {
    try {

        const borrow = await Borrow.find();

        res.status(201).json({
            success: true,
            message: "Borrowed books summary retrieved successfully",
            data: borrow
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: "Validation failed",
            error
        })
    }
})