import express, { NextFunction, Request, Response } from 'express'
import { Book } from '../models/book.model';

export const bookRoutes = express.Router();

bookRoutes.post('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const data = req.body;
        const book = await Book.create(data);

        res.status(201).json({
            success: true,
            message: "Book created successfully",
            data: book
        })
    } catch (error: any) {
        next(error)
    }

})

bookRoutes.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { filter,
            sortBy = "createdAt",
            sort = 'desc',
            limit = '10' } = req.query;

        const query: any = {};
        if (filter) {
            query.genre = filter;
        }

        const books = await Book.find(query)
            .sort({ [sortBy as string]: sort === "asc" ? 1 : -1 })
            .limit(Number(limit));

        res.status(201).json({
            success: true,
            message: "Books retrieved successfully",
            data: books
        })
    } catch (error: any) {
        next(error)
    }

})

bookRoutes.get('/:bookId', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.bookId;
        const book = await Book.findById(id)

        res.status(201).json({
            success: true,
            message: "Book retrieved successfully",
            data: book
        })
    } catch (error: any) {
        next(error)
    }

})

bookRoutes.put('/:bookId', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.bookId;
        const updateData = req.body;
        if (typeof updateData.copies === 'number') {
            updateData.available = updateData.copies > 0;
        }
        const book = await Book.findByIdAndUpdate(id, updateData, { new: true, runValidators: true })

        res.status(201).json({
            success: true,
            message: "Book updated successfully",
            data: book
        })
    } catch (error: any) {
        next(error)
    }

})

bookRoutes.delete('/:bookId', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.bookId;
        const book = await Book.findByIdAndDelete(id)

        res.status(201).json({
            success: true,
            message: "Book retrieved successfully",
            data: null
        })
    } catch (error: any) {
        next(error)
    }

})