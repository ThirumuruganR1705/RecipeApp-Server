import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import {userRouter} from '../src/routers/User.js'
import {recipeRouter} from '../src/routers/Recipe.js'
const app =express();

app.use(express.json());
app.use(cors());
app.use("/auth",userRouter);
app.use("/recipe",recipeRouter);

mongoose.connect("mongodb+srv://Krishnan:Recipes456@recipes.r8yaemh.mongodb.net/Recipes?retryWrites=true&w=majority")
.then(()=>console.log("mongodb connect"))
.catch((e)=>console.log(e.message));

app.listen(5000,()=>(console.log("Server is started at port 5000")));