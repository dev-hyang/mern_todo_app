import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
// import Button from 'react-bootstrap/Button';
// Referenced from https://www.positronx.io/react-js/

export default class TodoRow extends Component {
    //
    constructor(props){
        super(props);
        this.deleteTodo = this.deleteTodo.bind(this);
    }
    //
    deleteTodo(){
        console.log(this.props.obj._id);
        axios.delete('/todos/delete/'+this.props.obj._id)
            .then((res) => {
                console.log('Todo is successfully deleted!')
            }).catch(err => console.log(err));
        //
        window.location.reload();
        return false;
    }
    //
    render() {
        return (
            <tr>
                <td>{this.props.obj.todo_description}</td>
                <td>{this.props.obj.todo_responsible}</td>
                <td>{this.props.obj.todo_priority}</td>
                <td>{!(this.props.obj.todo_creationDate) ? "" : this.props.obj.todo_creationDate.substring(0, 10)}</td>
                <td>
                    <Link className="edit-link" to={"/edit/" + this.props.obj._id}>
                        Edit
                    </Link> | <a href='#' onClick={this.deleteTodo} size="sm" variant="danger">Delete</a>
                </td>
            </tr>
        )
    }
}