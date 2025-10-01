import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/connectDB.js";
import espRoutes from "./routes/esp.routes.js";
import { espModel } from "./models/esp.model.js";
dotenv.config();
const PORT = process.env.PORT || 8000;
const DATABASE_URL = process.env.DATABASE_URL;

const app = express();

app.use("/api/integrations", espRoutes);

connectDB(DATABASE_URL);
app.listen(PORT, () => {
  console.log(`Server up and running on Port:${PORT}`);
});
