import React, { Component } from 'react';
//import { Link } from 'react-router-dom';
import axios from 'axios';
// import Button from 'react-bootstrap/Button';
//

export default class DeleteTodo extends Component {
    
    constructor(props){
        super(props);
        this.deleteTodo = this.deleteTodo.bind(this);
        //
        this.state = {
            todo_description: '',
            todo_responsible: '',
            todo_priority: '',
            todo_completed: false
        }
    }
    //
    deleteTodo(){
        console.log(this.props.match.params.id);
        axios.delete('/todos/'+this.props.match.params.id)
            .then((res) => {
                console.log('Todo is successfully deleted!')
            }).catch(err => console.log(err));
        //redirects user back to the todo list page
        this.props.history.push('/');
        //Refresh page
        window.location.reload();
        return false;
    }

    componentDidMount(){
        axios.get('/todos/'+this.props.match.params.id)
            .then(response => {
                this.setState({
                    todo_description: response.data.todo_description,
                    todo_responsible: response.data.todo_responsible,
                    todo_priority: response.data.todo_priority,
                    todo_completed: response.data.todo_completed
                })
            })
            .catch(err => console.log(err))
    }

    render() {
        return (
            <div>
                <h3>Todo</h3>
                <table className="table table-striped" style={{ marginTop: 20 }} >
                    <thead>
                        <tr>
                            <th>Description</th>
                            <th>Responsible</th>
                            <th>Priority</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{this.state.todo_description}</td>
                            <td>{this.state.todo_responsible}</td>
                            <td>{this.state.todo_priority}</td>
                            <td>
                                <button size="sm" variant="danger" onClick={this.deleteTodo}>Delete</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        )
    }
}