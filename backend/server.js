const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const PORT = process.env.PORT || 3002;
// attach the cors and body-parser middleware
app.use(cors());
app.use(bodyParser.json());
// Make the server listening on PORT 3002
const dbRoute = process.env.MONGODB_URI;

mongoose.connect(dbRoute, {
	useNewUrlParser: true
});

const conn = mongoose.connection;

conn.once('open', function(){
	console.log("MongoDB database is successfully connected.")
});

const todoRouter = require('./routes/todo.route');

app.use('/todos', todoRouter)

app.listen(PORT, function(){
	console.log("Server is running on Port: " + PORT);
});