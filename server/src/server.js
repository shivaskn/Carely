// Import section

import express from 'express';
import cors from 'cors';
import 'dotenv/config' // Global declaration
import connection from './config/connection.js';
import connectCloud from './config/cloudinary.js';
import adminRouter from './routes/adminRoute.js';
import doctorRouter from './routes/doctorRoute.js';
import userRouter from './routes/userRoute.js';
import careersRouter from './routes/careersRoute.js';



// App Config

const app = express()
const port = process.env.PORT || 8000
connection()
connectCloud()

// Middlewares

app.use(express.json())
app.use(cors({
    origin: "https://carelys.netlify.app/",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
}))

// Api endpoints
// localhost:8000/api/admin/add:doctor
app.use('/api/admin',adminRouter);
app.use('/api/doctor',doctorRouter);
app.use('/api/user',userRouter);
app.use('/api/jobvacancy',careersRouter);



app.get('/', (req,res)=> {
    res.send('Carely Server is Running')
})

app.listen(port, ()=> console.log("Server is Running on:",port))