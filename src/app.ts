import express from "express";
import cookieParser from "cookie-parser";

import healthRoutes from "./routes/healthRoutes.js";
import authRoutes from "./routes/authRoutes.js";

import errorHandler from "./middlewares/errorHandler.js";

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use("/", healthRoutes);
app.use("/auth", authRoutes);

app.use(errorHandler);

export default app;
