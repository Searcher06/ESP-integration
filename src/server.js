import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/connectDB.js";
import integrationRoutes from "./routes/integration.routes.js";
import { integrationModel } from "./models/integration.model.js";
import { loggerMiddleware } from "./middleware/logger.js";
import { errorMiddleware } from "./middleware/error.js";

dotenv.config();
const PORT = process.env.PORT || 8000;
const DATABASE_URL = process.env.DATABASE_URL;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(loggerMiddleware);

app.use("/api/integrations", integrationRoutes);

app.use(errorMiddleware);
connectDB(DATABASE_URL);
app.listen(PORT, () => {
  console.log(`Server up and running on Port:${PORT}`);
});
