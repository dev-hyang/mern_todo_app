import React, { Component } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

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
		this.onChangeTodoCreationDate = 
		this.onChangeTodoCreationDate.bind(this);
		//onSubmit method is used to handle the submit event of the form to create a new todo item
		this.onSubmit = 
		this.onSubmit.bind(this);

		this.state = {
			todo_description: '',
			todo_responsible: '',
			todo_priority: '',
			todo_completed: false,
			todo_creationDate: new Date()
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
	//
	onChangeTodoPriority(e){
		this.setState({
			todo_priority: e.target.value
		});
	}
	//
	onChangeTodoCreationDate(date){
		this.setState({
			todo_creationDate: date
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
		console.log(`Todo CreationDate: ${this.state.todo_creationDate}`);
		//Bug2: 2020-09-07, How to show date correctly
		//Backend automatically will convert local time to UTC time zone and store them in the database
		//Solution: before sending to backend, we manually substract the incremental of UTC zones
		const conv_date = new Date(this.state.todo_creationDate.getTime() -
					this.state.todo_creationDate.getTimezoneOffset()*60000);
		//
		const newTodo = {
			todo_description: this.state.todo_description,
            todo_responsible: this.state.todo_responsible,
            todo_priority: this.state.todo_priority,
            todo_completed: this.state.todo_completed,
            todo_creationDate: conv_date
		};
		//console.log(newTodo);
		//backend REST create api
		axios.post('/todos/', newTodo)
            .then(res => console.log(res.data));

		this.setState({
			todo_description: '',
			todo_responsible: '',
			todo_priority: '',
			todo_completed: false,
			todo_creationDate: new Date()
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
			            <label>CreationDate: </label>
			            <div>
			              <DatePicker
			                selected={this.state.todo_creationDate}
			                onChange={this.onChangeTodoCreationDate}
			              />
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