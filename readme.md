# 🚀 Express.js + TypeScript Starter

A minimal boilerplate for building a backend server using **Node.js**, **Express**, and **TypeScript**.

---

## 📦 Technologies Used

- [Node.js](https://nodejs.org/)
- [Express.js](https://expressjs.com/)
- [TypeScript](https://www.typescriptlang.org/)
- MongoDB (Mongoose)
- [ts-node-dev](https://www.npmjs.com/package/ts-node-dev)

---

## 🛠 Installation & Setup

### 1️⃣ Initialize the Project

creating a src folder and inside src create app folder, app.ts, server.ts file

```bash
npm init -y
```
### 2️⃣ Install TypeScript, Express & mongoose
```bash
npm install -D typescript express mongoose
```

### 3️⃣  Initialize TypeScript Configuration
```bash
tsc --init
```

#### Then in tsconfig.json, configure these options:
```bash
// line ~30
"rootDir": "./src/",

// line ~62
"outDir": "./dist/",
```

### 4️⃣ Install TypeScript Globally
```bash
npm install -g typescript
npm i --save-dev @types/express
```
### app.ts file
```bash
import express, { Application, Request, Response } from 'express';

const app: Application = express();

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!, Welcome to Note App')
})

export default app;
```

### server.ts file
```bash
import { Server } from 'http';
import app from './app';

let server: Server;
const port = 5000;

async function main() {
    try {
        server = app.listen(port, () => {
            console.log(`Example app listening on port ${port}`)
        })
    } catch (error) {
        console.log(error);
    }
}

//must call the main function to run server
main(); 

```

## ✅ What does ts-node-dev do?
- Combines ts-node (TypeScript execution) and nodemon (auto-restart on changes).
- No need to manually run tsc and then node dist/index.js.
- Much faster development workflow.

### 📦 Installation in devDependencies
```bash
npm install --save-dev ts-node-dev
```

### 🧾 Update Your package.json Scripts
#### Add this to your scripts section:
```bash
"scripts": {
  "dev": "ts-node-dev --respawn --transpile-only src/server.ts",
}
```

### 🏁 Run the Dev Server
```bash
npm run dev
```

### 🏁 MongoDB Connection Example (with mongoose.connect)
#### import mongoose
```bash
async function main() {
    try {
        await mongoose.connect('mongodb+srv://mongodb:<your_username>:<your_password>@cluster0.v0031py.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');

// 🔔 Your MongoDB connect URL. Use this connection string in your application. Copy the URL and replace <your_username> and <your_password>.

        console.log("Connected to MongoDB Using Mongoose!!");
        server = app.listen(port, () => {
            console.log(`App is listening on port ${port}`)
        })
    } catch (error) {
        console.log(error);
    }
}
```

### ✅ Option 2: Explain outside the code block
> 🔹 **Note**: Replace `<your_username>` and `<your_password>` in the connection string with your actual MongoDB Atlas credentials.
> Use this connection string in your application. **Copy it from MongoDB Atlas Dashboard**.
