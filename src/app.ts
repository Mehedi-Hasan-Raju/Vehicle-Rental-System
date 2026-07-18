import express, {Request, Response } from 'express';

const app = express()

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Server is running...");
});




export default app;