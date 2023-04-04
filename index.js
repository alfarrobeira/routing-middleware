import express from "express";
import userRoutes from "./routes/userRoutes.js";
import secure from "./middleware/secure.js";
import { verifyToken } from "./controllers/tokenController.js";

const app = express();
const port = 3001;

// middleware applied on all routes to be able to read the req.body in JSON
app.use(express.json());

// define routes directly
// home path - one route only:
app.get("/", (req, res) => res.send("Hello from server"));
// apply middleware function "secure" on the get request from this path
app.get('/verify/:token', secure, verifyToken);

// define routes from specific class
app.use("/user", userRoutes);

app.listen(port, () => console.log(`Server listening on port ${port}`));
