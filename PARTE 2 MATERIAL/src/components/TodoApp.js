import React from 'react';
import {TodoList} from '../TodoList.js';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';


export class TodoApp extends React.Component {
    constructor(props) {
        super(props);
        this.state = { items: [], text: '' };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    render() {
        return (
            <div>
                <h3>TODO</h3>
                <TodoList todoList={this.state.items} />
                <form onSubmit={this.handleSubmit}>
                    <TextField
                        id="new-todo"
                        onChange={this.handleChange}
                        value={this.state.text}
                        label="What needs to be done?"
                    />
                    <Button>
                        Add #{this.state.items.length + 1}
                    </Button>
                </form>
            </div>
        );
    }

    handleChange(e) {
        this.setState({ text: e.target.value });
    }

    handleSubmit(e) {
        e.preventDefault();
        if (!this.state.text.length) {
            return;
        }
        const newItem = {
            text: this.state.text,
            dueDate: Date.now()
        };
        this.setState(prevState => ({
            items: prevState.items.concat(newItem),
            text: ''
        }));
    }
}