import dotenv from 'dotenv';
import express from "express";
import router from "./route.js";
const app = express();
app.use(express.json())

// Load environment variables from .env file
dotenv.config();

app.use(router)

export default app;