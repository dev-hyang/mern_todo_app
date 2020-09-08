import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
// import TodoRow from './todoRow.component';
//用一个tableRow来代替分散的功能
const Todo = props => (
    <tr>
        <td>{props.todo.todo_description}</td>
        <td>{props.todo.todo_responsible}</td>
        <td>{props.todo.todo_priority}</td>
        <td>{!(props.todo.todo_creationDate) ? "" : 
            props.todo.todo_creationDate.substring(0, 10)}</td>
        <td>
            <Link to={"/edit/"+props.todo._id}>Edit</Link> |  <a href="#" 
                onClick={() => {props.deleteTodo(props.todo._id)}}>Delete</a>
        </td>
    </tr>
)
export default class TodosList extends Component {
    constructor(props) {
        super(props);
        this.state = {todos: []};
        this.deleteTodo = this.deleteTodo.bind(this);
    }
    componentDidMount() {
        axios.get('/todos/')
            .then(response => {
                this.setState({ todos: response.data });
            })
            .catch(function (error){
                console.log(error);
            })
    }
    //
    todoList() {
        return this.state.todos.map((currentTodo, i) => {
            return <Todo todo={currentTodo} deleteTodo={this.deleteTodo} key={i} />;
        })
    }
    //
    deleteTodo(id){
        axios.delete('/todos/' + id)
            .then((res) => {
                console.log('Todo is successfully deleted!')
            }).catch(err => console.log(err));
        //
        this.setState({
            todos: this.state.todos.filter(tl => tl._id !== id)
        })
    }
    //
    render() {
        return (
            <div>
                <h3>Todos List</h3>
                <table className="table table-striped" style={{ marginTop: 20 }} >
                    <thead>
                        <tr>
                            <th>Description</th>
                            <th>Responsible</th>
                            <th>Priority</th>
                            <th>CreationDate</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        { this.todoList() }
                    </tbody>
                </table>
            </div>
        )
    }
}