const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const PORT = 4000;
// attach the cors and body-parser middleware
app.use(cors());
app.use(bodyParser.json());
// Make the server listening on PORT 4000
mongoose.connect('mongodb://127.0.0.1:27017/todos', {
	useNewUrlParser: true
});

const conn = mongoose.connection;

conn.once('open', function(){
	console.log("MongoDB database is successfully connected.")
});

app.listen(PORT, function(){
	console.log("Server is running on Port: " + PORT);
});