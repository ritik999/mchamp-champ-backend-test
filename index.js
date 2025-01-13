import express from 'express';
import dotenv from 'dotenv'
import { actionRoute } from './routes/action.routes.js';
import cors from 'cors';
import helmet from 'helmet';
dotenv.config();

const app=express();
app.use(express.json());
app.use(helmet());
app.use(cors({
    origin:'*',
    credentials:true
}))
app.use((err,req,res,next)=>{
    console.log(err.stack);
    res.status(500).json({error:'something broke!'});
})

// Endpoints
app.use('/api/action',actionRoute)

app.listen(process.env.PORT,()=>{
    console.log('app is running on PORT:',process.env.PORT);
    
})