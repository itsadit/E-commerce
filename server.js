import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./config/db.js";
import authroutes from "./routes/authroute.js";
import categoryRoutes from './routes/categoryroutes.js';
import productRoutes from './routes/productroutes.js';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

//configure env
dotenv.config();

//esmodule fix
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//database config
connectDB();

const app = express();

//middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, './client/build')));


//routes    
app.use("/api/v1/auth", authroutes);
app.use("/api/v1/category", categoryRoutes);
app.use("/api/v1/product", productRoutes);

//rest api
app.use('*', function (req, res) {
    res.sendFile(path.join(__dirname, './client/build/index.html'));
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`server running on ${PORT}`);
});
