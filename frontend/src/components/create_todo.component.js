import React, { Component } from 'react';

export default class CreateTodo extends Component{
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
		//onSubmit method is used to handle the submit event of the form to create a new todo item
		this.onSubmit = 
		this.onSubmit.bind(this);

		this.state = {
			todo_description: '',
			todo_responsible: '',
			todo_priority: '',
			todo_completed: false
		}
	}

	onChangeTodoDescription(e){
		this.setState({
			todo_description: e.target.value
		});
	}

	onChangeTodoResponsible(e){
		this.setState({
			todo_responsible: e.target.value
		});
	}

	onChangeTodoPriority(e){
		this.setState({
			todo_priority: e.target.value
		});
	}

	onSubmit(e){
		//we use preventDefault() method to ensure the default HTML form submit
		//behavior is prevented during test because the backend is not completed yet.
		e.preventDefault();

		//print out currrent property values only
		console.log(`Form submitted:`);
		console.log(`Todo Description: ${this.state.todo_description}`);
		console.log(`Todo Responsible: ${this.state.todo_responsible}`);
		console.log(`Todo Priority: ${this.state.todo_priority}`);

		this.setState({
			todo_description: '',
			todo_responsible: '',
			todo_priority: '',
			todo_completed: false
		})
	}

	render(){
		return (
			<div style={{marginTop: 10}}>
				<h3>Create New Todo</h3>
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
						<div className="form-check form-check-inline">
							<input className="form-check-input"
								type="radio"
								name="priorityOptions"
								id="priorityLow"
								value="Low"
								checked={this.state.todo_priority === 'Low'}
								onChange={this.onChangeTodoPriority} />
							<label className="form-check-label">Low</label>
						</div>
						<div className="form-check form-check-inline">
							<input className="form-check-input"
								type="radio"
								name="priorityOptions"
								id="priorityMedium"
								value="Medium"
								checked={this.state.todo_priority === 'Medium'}
								onChange={this.onChangeTodoPriority} />
							<label className="form-check-label">Medium</label>
						</div>
						<div className="form-check form-check-inline">
							<input className="form-check-input"
								type="radio"
								name="priorityOptions"
								id="priorityHigh"
								value="High"
								checked={this.state.todo_priority === 'High'}
								onChange={this.onChangeTodoPriority} />
							<label className="form-check-label">High</label>
						</div>
					</div>
					<div className="form-group">
						<input type="submit" value="Create Todo" className="btn btn-primary" />
					</div>
				</form>
			</div>
		)
	}
}