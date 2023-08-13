const express = require('express')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const routes = require('./routes/routes');
const adminMiddleware = require('./middleware/adminMiddleware');
const userMiddleware = require('./middleware/userMiddleware');
require('dotenv').config()

const app = express()
app.use(bodyParser.json())
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

const mongoURI = process.env.URI 
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

const db = mongoose.connection
db.on('error', console.error.bind(console, 'MongoDB connection error:'))
db.once('open', () => {
  console.log('Connected to DB')
})
app.use('/admin/check', adminMiddleware);
app.use('/user/check', userMiddleware);

routes(app)

app.get('/', (req, res) => {
    res.send('Hello World!');
  });

const PORT = 3010
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
