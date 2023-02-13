require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const mongoose = require('mongoose');

const PORT = 3500 || process.env.PORT;
const routes = require('./routes/root');
const userRoutes = require('./routes/userRoutes')
const logEvents = require('./middleware/logger');
const corsOptions = require('./config/corsOptions');

const app = express();

app.use(cors(corsOptions));
app.use(logEvents);
app.use(cookieParser());
app.use(express.json({ limit: '50mb', extended: false }));
app.use(express.urlencoded({ limit: '50mb', extended: false }));
app.use('/user', userRoutes);

const main = async () => {
  mongoose.set('strictQuery', false);
  await mongoose.connect(process.env.MONGO_URI);
  app.listen(PORT, () => {
    console.log(`connected to ${PORT}`);
  });
};

main().catch(err=>console.log(err.message))
  