import React, { Component } from 'react';
import axios from 'axios';

export default class EditTodo extends Component {

	//Add a constructor and initialize this.state with a hashMap
	constructor(props){
		super(props);
		/** set methods for this.state's properties: todo_description, 
		* todo_responsible, todo_priority
		*/
		this.onChangeTodoDescription = 
		this.onChangeTodoDescription.bind(this);
		this.onChangeTodoResponsible = 
		this.onChangeTodoResponsible.bind(this);
		this.onChangeTodoPriority = 
		this.onChangeTodoPriority.bind(this);
        this.onChangeTodoCompleted = 
        this.onChangeTodoCompleted.bind(this);
		//onSubmit method is used to handle the submit event of the form to create a new todo item
		this.onSubmit = this.onSubmit.bind(this);

		this.state = {
			todo_description: '',
			todo_responsible: '',
			todo_priority: '',
			todo_completed: false
		}
	}
	onChangeTodoDescription(e) {
        this.setState({
            todo_description: e.target.value
        });
    }
    onChangeTodoResponsible(e) {
        this.setState({
            todo_responsible: e.target.value
        });
    }
    onChangeTodoPriority(e) {
        this.setState({
            todo_priority: e.target.value
        });
    }
    onChangeTodoCompleted(e) {
        this.setState({
            todo_completed: !this.state.todo_completed
        });
    }
	//componentDidMount() + this.props.match.params.id
	//Retrieve the todo item from database based on id
	componentDidMount(){
		axios.get('/todos/'+this.props.match.params.id)
			.then(response => {
				this.setState({
					todo_description: response.data.todo_description,
					todo_responsible: response.data.todo_responsible,
					todo_priority: response.data.todo_priority,
					todo_completed: response.data.todo_completed,
                    todo_creationDate: response.data.todo_creationDate
				})
			})
			.catch(err => console.log(err))
	}
	//Handle of onSubmit event in the form
	onSubmit(e){
		//we use preventDefault() method to ensure the default HTML form submit
		//behavior is prevented during test because the backend is not completed yet.
		e.preventDefault();
		//create a updated Todo item
		const updatedTodo = {
			todo_description: this.state.todo_description,
            todo_responsible: this.state.todo_responsible,
            todo_priority: this.state.todo_priority,
            todo_completed: !(this.state.todo_completed) ? false : this.state.todo_completed,
            todo_creationDate: !(this.state.todo_creationDate) ? new Date() :
                this.state.todo_creationDate
		};
        // console.log(updatedTodo);
		//
		axios.post('/todos/update/'+this.props.match.params.id, updatedTodo)
		.then(res => console.log(res.data));
		//redirects user back to the todo list page
		// this.props.history.push('/');
		//Refresh page
		// window.location.reload();
		// return false;
        window.location = '/';
	}
	//
    render() {
        return (
            <div>
            	<h3 align="center">Update Todo</h3>
            	<form onSubmit={this.onSubmit}>
            		<div className="form-group">
            			<label>Description:</label>
            			<input type="text"
            					className="form-control"
            					value={this.state.todo_description}
            					onChange={this.onChangeTodoDescription}
            					/>
            		</div>
            		<div className="form-group">
            			<label>Responsible:</label>
            			<input type="text"
            					className="form-control"
            					value={this.state.todo_responsible}
            					onChange={this.onChangeTodoResponsible}
            					/>
            		</div>
            		<div className="form-group">
            			<div className="form-check form-check-inline">
            				<input className="form-check-input"
            						type="radio"
            						name="priorityOptions"
            						id="priorityLow"
            						value="Low"
            						checked={this.state.todo_priority === 'Low'}
            						onChange={this.onChangeTodoPriority}
            						/>
            				<label className="form-check-label">Low</label>
            			</div>
            			<div className="form-check form-check-inline">
            				<input className="form-check-input"
            						type="radio"
            						name="priorityOptions"
            						id="priorityMedium"
            						value="Medium"
            						checked={this.state.todo_priority === 'Medium'}
            						onChange={this.onChangeTodoPriority}
            						/>
            				<label className="form-check-label">Medium</label>
            			</div>
            			<div className="form-check form-check-inline">
            				<input className="form-check-input"
            						type="radio"
            						name="priorityOptions"
            						id="priorityHigh"
            						value="High"
            						checked={this.state.todo_priority === 'High'}
            						onChange={this.onChangeTodoPriority}
            						/>
            				<label className="form-check-label">High</label>
            			</div>
            		</div>
            		<div className="form-check">
            			<input className="form-check-input"
            				id="completedCheckbox"
            				type="checkbox"
            				name="completedCheckbox"
            				onChange={this.onChangeTodoCompleted}
            				checked={this.state.todo_completed}
            				value={this.state.todo_completed}
            				/>
            			<label className="form-check-label" htmlFor="completedCheckbox">
            			Complete</label>
            		</div>

            		<br />

            		<div className="form-group">
            			<input type="submit" value="Update Todo" className="btn btn-primary" />
            		</div>
            	</form>
            </div>
        )
    }
}