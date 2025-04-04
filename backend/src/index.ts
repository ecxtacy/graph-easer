import { Request, Response } from "express";
import express from "express";
import v1Router from "./routers/v1Router";
import helmet from "helmet";
import morgan from "morgan";

// Initialize the app
const app = express();

// todo: fix port number through ENV
const port = 3000;

app.use(express.json());
app.use(helmet());
app.use(morgan("tiny"));

// Basic route
app.get("/", (req: Request, res: Response) => {
  res.send("Hello from graph-easer server !");
});

app.use("/api", v1Router);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
