import express from 'express';
import bodyParser from 'body-parser';
import connectDB from './DB/Config.js';
import UserRoutes from  './Routes/UserRoute.js';
import DocRoutes from './Routes/VetDocRoutes.js';
import WoundedAnimalRoutes from './Routes/WoundedAnimalRoutes.js';
import { fileURLToPath } from 'url';
import path from 'path';
import cors from 'cors';
import ejs from 'ejs';
connectDB();

const __filename = fileURLToPath(import.meta.url); 
const __dirname = path.dirname(__filename); 

const app = express();
const PORT = 5000;

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use('/user', UserRoutes);
app.use('/vetDoc', DocRoutes);
app.use('/woundedAnimals', WoundedAnimalRoutes);

app.listen(PORT, () => console.log(`The server is running on port: http://localhost:${PORT}`));
app.get('/', (req, res) => {
    res.send('hello from home');
});