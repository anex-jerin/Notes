require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser')
const cors = require('cors')
const PORT = 3500 || process.env.PORT;
const routes = require('./routes/root')
const logEvents =require('./middleware/logger')
const corsOptions = require('./config/corsOptions')

const app = express();

app.use(cors(corsOptions))
app.use(logEvents)
app.use(cookieParser())
app.use(express.json({ limit: '50mb', extended: false }));
app.use(express.urlencoded({ limit: '50mb', extended: false }));
app.use('/',routes)

app.listen(PORT, () => {
  console.log(`connected to ${PORT}`);
});
