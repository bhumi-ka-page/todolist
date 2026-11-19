import "dotenv/config";
import cors from "cors";
import express from "express";
import connectDB from "./config/db.js";
import { errorHandler, notFound } from "./middleware/errorHandler.js";
import taskRoutes from "./routes/taskRoutes.js";

const app = express();
const port = process.env.PORT || 5000;

app.use(cors({ origin: process.env.CLIENT_ORIGIN || "http://localhost:5173" }));
app.use(express.json({ limit: "20kb" }));
app.get("/api/health", (_request, response) => response.json({ status: "ok" }));
app.use("/api/tasks", taskRoutes);
app.use(notFound);
app.use(errorHandler);

async function startServer() {
  try {
    await connectDB();
    app.listen(port, () => console.log(`Taskflow API listening on http://localhost:${port}`));
  } catch (error) {
    console.error(`Unable to start the API: ${error.message}`);
    process.exitCode = 1;
  }
}

if (process.env.NODE_ENV !== "test") {
  startServer();
}

export default app;
