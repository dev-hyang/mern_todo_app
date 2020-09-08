const router = require('express').Router();
let Todo = require('../models/todo.model');

//Get methods for all todo items
router.route('/').get((req, res) => {
  Todo.find()
    .then(todos => res.json(todos))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
	let id = req.params.id;
	Todo.findById(id)
		.then(todo => res.json(todo))
		.catch(err => res.status(400).json('Error: ' + err));
});

router.route('/').post((req, res) => {
	// If all string, then can easily use new Todo(req.body), o.w.,
	// let todo = new Todo(req.body);
	const todo_description = req.body.todo_description;
	const todo_responsible = req.body.todo_responsible;
	const todo_priority = req.body.todo_priority;
	const todo_completed = req.body.todo_completed;
	console.log(req.body.todo_creationDate);
	const todo_creationDate = Date.parse(req.body.todo_creationDate);
	//save() method to save object into database
	const todo = new Todo({
		todo_description,
		todo_responsible,
		todo_priority,
		todo_completed,
		todo_creationDate
	})
	// console.log(todo);
	todo.save()
		.then(todo => {
			res.status(200).json({'msg': 'todo added successfully!',
								'todo': todo,
								'req_body': req.body});
		})
		.catch(err => {
			res.status(400).send('adding new todo failed.');
		});
});
//Use post or get or delete?
router.route('/:id').delete((req, res) => {
	Todo.findByIdAndRemove(req.params.id, (err, data) => {
		if (!err){
			//res.redirect('/todos/');
			() => res.status(200).json('Todo deleted.');
			// window.location = '/'; //internet server error 500
		}
		else{
			console.log('Err when deleting todo:'+err);
		}
	});
});
//
router.route('/:id').post((req, res) => {
	Todo.findById(req.params.id)
		.then(todo => {
			if (!todo)
				res.status(404).send("data is not found");
			else
				todo.todo_description = req.body.todo_description;
				todo.todo_responsible = req.body.todo_responsible;
				todo.todo_priority = req.body.todo_priority;
				todo.todo_completed = req.body.todo_completed;
				todo.todo_creationDate = req.body.todo_creationDate;
				todo.save()
					.then(todo => {
						res.json('Todo updated!');
					})
					.catch(err => {
						res.status(400).send("Update not possible");
					})
		})
		.catch(err => {
			res.status(404).send("id is invalid.");
		});
});

module.exports = router;

