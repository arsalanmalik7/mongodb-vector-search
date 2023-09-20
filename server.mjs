import express from 'express'
import path from 'path';
const __dirname = path.resolve();
import 'dotenv/config';
import cors from 'cors';





const app = express();
app.use(express.json());
app.use(cors());

import postRouter from './api/routes/posts.mjs';


app.use(express.static(path.join(__dirname, './frontend/build')))


app.use('/api', postRouter);




const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`posting app listening on ${PORT} `)
})