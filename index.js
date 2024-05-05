import express from "express";
import dotenv from "dotenv"
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRoute from './routes/userRoute.js'
import postRoute from './routes/postRoute.js'
import authRoute from './routes/authRoute.js'
import categoryRoute from './routes/categoryRoute.js'
import commentsRoute from './routes/commentsRoute.js'
import { fileURLToPath } from 'url';
import path, { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config();
const app = express();
// app.use(express.static('uploads'))
// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/uploads', express.static(join(__dirname, 'uploads')));

app.use(express.static(path.join(__dirname,"../frontEnd/dist")))

app.get("*", (req,res)=>{
  res.sendFile(path.join(__dirname,"/frontEnd/dist.index.html"))
})



// app.get('*', (req, res)=>{
//   res.sendFile(path.join(__dirname, "/frontEnd/dist/index.html"))
// })

const port = process.env.PORT || 8000

// const corsOptions = {
//     origin: true,
//     credentials: true,
// }

/// DATABASE CONNECTION
mongoose.set('strictQuery', false);

const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);

        console.log("MongoDB Database Connected");

    } catch (err) {
        console.log("MongoDB Database Connection Failed");

    }
}

// Define the list of allowed origins
const allowedOrigins = ['http://127.0.0.1:5173', 'http://localhost:5000']; // Add any other origins as needed

// Configure CORS with options
const corsOptions = {
  origin: function (origin, callback) {
    // Check if the origin is allowed or if it's a preflight request
    if (!origin || allowedOrigins.includes(origin) || origin === undefined) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true, // Allow sending credentials (e.g., cookies, authorization headers)
};

//// MIDDLEWARES

app.use(express.json());
app.use(cors(corsOptions));
// app.use(cors({
//     origin: 'Access-Control-Allow-Origin',
//     credentials: true,
//     allowedHeaders: 'X-Requested-With, Content-Type, Authorization',
//     methods: 'GET, POST, PATCH, PUT, POST, DELETE, OPTIONS'
// }))
app.use(cookieParser());
app.use("/api/v1/users", userRoute);
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/posts", postRoute);
app.use("/api/v1/comments", commentsRoute);
app.use("/api/v1/category", categoryRoute);


/// TO START SERVER
app.listen(port, () => {
    connect();
    console.log(`Server started successfully on port ${port}`);
})