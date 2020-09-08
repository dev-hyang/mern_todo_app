const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create the schema/table in mongoDB
let Todo = new Schema({
	todo_description:{
		type: String,
		required: true
	},
	todo_responsible:{
		type: String,
		required: true
	},
	todo_priority:{
		type: String,
		required: true
	},
	todo_completed:{
		type: Boolean
	},
	todo_creationDate:{
		type: Date,
		required: true
	}
},{
	timestamps: true,
});

module.exports = mongoose.model('Todo', Todo);