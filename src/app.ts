import express, {Request, Response } from 'express';
import initDB from './config/db';
import logger from './middlewere/loger';
import { userRoute } from './modules/users/user.route';
import { authRoutes } from './modules/auth/auth.route';
const app = express()


//initialize database
initDB();

app.use(express.json());

app.get('/', logger,(req:Request, res:Response) => {
  res.send('Hello Raju!')
})
//user CRUD

app.use('/api/v1/users', userRoute)

app.use("/api/v1/auth", authRoutes)

app.get("/", (req, res) => {
  res.send("Server is running...");
});




export default app;