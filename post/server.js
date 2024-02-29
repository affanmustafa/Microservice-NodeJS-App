import express from "express";
import "dotenv/config";
import Routes from "./routes/index.js";
import cors from "cors";
const app = express();

const PORT = process.env.PORT || 3001;

// Middleware

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.get("/", (req, res) => {
  console.log(`Post app listening on port ${PORT}`);
});

// Routes
app.use(Routes);

app.listen(PORT, () => {
  console.log(`Post app listening on port ${PORT}`);
});
