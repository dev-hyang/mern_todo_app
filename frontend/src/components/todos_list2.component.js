import React, { Component } from 'react';
import axios from 'axios';
import TodoRow from './todoRow.component';
//用一个tableRow来代替分散的功能
export default class TodosList2 extends Component {
    constructor(props) {
        super(props);
        this.state = {todos: []};
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
            return <TodoRow obj={currentTodo} key={i} />;
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