import express from "express";
import "dotenv/config";
import cors from "cors";
import Routes from "./routes/index.js";
const app = express();

const PORT = process.env.PORT || 3000;

// Middleware

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.get("/", (req, res) => {
  console.log(`App listening on port ${PORT}`);
});

// Routes

app.use(Routes);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
