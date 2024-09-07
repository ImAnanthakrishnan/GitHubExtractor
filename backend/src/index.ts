import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import cors from 'cors';
import { errorHandler, notFound } from "./middlewares/errorMiddleware";
import DatabaseConnection from "./services/dbConnection";
dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;
const mongoUri = process.env.MONGO_URL;

//database connection
const DB_CONNECT = new DatabaseConnection(mongoUri);
DB_CONNECT.connect();

//cors configuration -> preflight options
const corsOption = {
  origin:true,
  methods:['GET','POST','PUT','PATCH','DELETE']
}

app.use(cors(corsOption));

//parsers
app.use(express.json());
app.use(express.urlencoded({extended:false}));


import gitUserRouter from './routes/features/gitUser'

app.use(`${process.env.BASE_URL}/user`,gitUserRouter);

//error and not found middlewares
app.use(notFound)
app.use(errorHandler);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
