import express, { Application, ErrorRequestHandler, NextFunction, Request, Response } from 'express';
import { bookRoutes } from './app/controllers/book.controller';
import { borrowRoutes } from './app/controllers/borrow.controller';

const app: Application = express();

app.use(express.json());
app.use('/api/books', bookRoutes);
app.use('/api/borrow', borrowRoutes);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!, Welcome to Library Management System');
});

app.use((req: Request, res: Response) => {
  res.status(404).json({ message: 'Route not fount' });
});

app.use(((error: any, req: Request, res: Response, next: NextFunction) => {
  if (error.name === 'ValidationError') {
    return res.status(400).json({
      message: 'Validation failed',
      success: false,
      error: {
        name: error.name,
        errors: error.errors,
      },
    });
  }

  res.status(error.statusCode || 500).json({
    message: error.message || 'Something went wrong',
    success: false,
    error,
  });
}) as ErrorRequestHandler);

export default app;