import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import adminRoute from "./routes/adminRoutes.js";
import tenantRoute from "./routes/tenantRoutes.js";
import cors from "cors";


const app = express();
app.use(cors());
app.use(bodyParser.json());
dotenv.config();

app.use("/admin",adminRoute);
app.use('/tenant',tenantRoute)

const PORT = process.env.PORT;
app.listen(PORT,()=>{
    console.log(`server is running at ${PORT}`)
});