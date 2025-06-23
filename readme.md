# 📚 Library Management System

A full-featured Library Management System built with **Express**, **TypeScript**, and **MongoDB** using **Mongoose ORM**. This system supports book creation, updates, borrowing with availability enforcement, and reporting via aggregation.

---

## 🚀 Tech Stack

- **Backend Framework**: Express.js
- **Language**: TypeScript
- **Database**: MongoDB
- **ODM**: Mongoose

---

## ✅ Features

- Book CRUD operations with full validation
- Borrowing logic with business rules (availability, copies update)
- Aggregation pipeline for borrow summary
- Filtering, sorting, and pagination support
- Custom Mongoose static methods
- Mongoose pre/post middleware

---

## 📁 Project Structure

src/
├── controllers/
│ ├── book.controller.ts
│ └── borrow.controller.ts
├── models/
│ ├── book.model.ts
│ └── borrow.model.ts
├── routes/
│ ├── book.routes.ts
│ └── borrow.routes.ts
├── app.ts
├── server.ts

## 🧪 API Endpoints

### 1. Create a Book
**POST** `/api/books`

```json
{
  "title": "The Theory of Everything",
  "author": "Stephen Hawking",
  "genre": "SCIENCE",
  "isbn": "9780553380163",
  "description": "An overview of cosmology and black holes.",
  "copies": 5,
  "available": true
}
```

### 2. Get All Books
```
GET /api/books
```
### Query Parameters:
- filter: Filter by genre (e.g., SCIENCE)
- sortBy: Field to sort by (e.g., createdAt)
- sort: asc or desc
- limit: Limit number of results

### 3. Get Book by ID
```
GET /api/books/:bookId
```

### 4. Update Book
```
PUT /api/books/:bookId
```
```json
{
  "copies": 50
}
```

### 5. Delete Book

```
DELETE /api/books/:bookId
```
### 6. Borrow a Book

```
POST /api/borrow
```
```json
{
  "book": "BOOK_OBJECT_ID",
  "quantity": 2,
  "dueDate": "2025-07-18T00:00:00.000Z"
}
```

### Business Logic:
- Verifies sufficient available copies
- Deducts copies and updates availability (if zero)
- Uses Mongoose static method for stock adjustment

### 7. Borrowed Books Summary

```
GET /api/borrow
```

```json
{
  "success": true,
  "message": "Borrowed books summary retrieved successfully",
  "data": [
    {
      "book": {
        "title": "The Theory of Everything",
        "isbn": "9780553380163"
      },
      "totalQuantity": 5
    }
  ]
}
```

## Mongoose Features Used
- Aggregation pipeline in /api/borrow GET
- Static method on Book model to manage stock and availability

- Pre/Post middleware for logging or validation

## 🧪 Error Handling
#### Generic error format:
```json
{
  "message": "Validation failed",
  "success": false,
  "error": {
    "name": "ValidationError",
    "errors": {
      "copies": {
        "message": "Copies must be a positive number",
        "name": "ValidatorError",
        "properties": {
          "message": "Copies must be a positive number",
          "type": "min",
          "min": 0
        },
        "kind": "min",
        "path": "copies",
        "value": -5
      }
    }
  }
}
```

## 📦 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/AbidShazid3/B5--Assignment-3.git
```

### 2. Install Dependencies
```ts
npm install
```
### 3. Run the Server
```ts
npm run dev
```