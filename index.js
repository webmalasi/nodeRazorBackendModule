// const express = require("express");
import express from "express"
import dotenv from "dotenv"
import cors from "cors"
const app= express();
app.use(cors())
app.use(express.json());

dotenv.config();
const PORT =3009;

import  usersroutes  from "./app/routes/api.js";

app.use("/api",usersroutes);
app.listen(PORT,()=>{

   console.log(`Server is running at http://localhost:${PORT}`);

});