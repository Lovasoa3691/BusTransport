import "dotenv/config";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import userRoutes from "./routes/userRoutes";
import ticketRoutes from "./routes/ticketRoutes";
import busRoutes from "./routes/busRoutes";
import terminusRoutes from "./routes/terminusRoutes";

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

app.use(express.json());
app.use(cookieParser());
app.use("/uploads", express.static("uploads"));
app.use("/api", userRoutes);
app.use("/api", ticketRoutes);
app.use("/api", busRoutes);
app.use("/api", terminusRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Serveur démarré sur http://localhost:${PORT}`);
});
