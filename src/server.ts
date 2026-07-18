import express, {Request, Response } from 'express';
import app from "./app"
import config from "./config"
import initDB, { pool } from './config/db'
import dotenv from "dotenv";
dotenv.config();

const port = config.port;


//initialize database
initDB();



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

export default app;