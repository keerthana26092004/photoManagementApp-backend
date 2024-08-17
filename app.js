



const express = require('express');
const app = express();
const bodyparser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');
const photoRouter = require('./routes/photoRoutes');
const path = require("path")

mongoose.connect('mongodb+srv://keerthanaravikumar188:keerthu123@cluster0.wfcwchf.mongodb.net/Photomanagement?retryWrites=true&w=majority&appName=Cluster0')
  .then(() => {
    console.log('mongodb connected');
  });

app.use(cors());
app.use(bodyparser.json());
app.use(express.json());


app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


app.use('/', userRoutes);
app.use('/', photoRouter);

app.listen(8000, () => {
  console.log('Server is running on port 8000');
});
