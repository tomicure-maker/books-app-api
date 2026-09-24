import express from "express";

import { PORT } from "./config.js";
import bookRoutes from "./routes/books.routes.js";
import { sequelize } from "./db.js";
import "./models/Book.js";

const app = express();

try {
  app.use(express.json());
  app.listen(PORT);
  app.use(bookRoutes);

  await sequelize.sync();

  console.log(`Server listening on port ${PORT}`);
} catch (error) {
  console.log("There was an error on initialization");
}
