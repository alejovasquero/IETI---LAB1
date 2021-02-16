import React from 'react';
import { TodoList } from '../TodoList.js';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import 'date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';

export class TodoApp extends React.Component {
    constructor(props) {
        super(props);
        this.state = { items: [], text: '', priority: 0, date: new Date() };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handlePriorityChange = this.handlePriorityChange.bind(this);
        this.handleDateChange = this.handleDateChange.bind(this);
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

                    <TextField
                        id="priority-text"
                        onChange={this.handlePriorityChange}
                        value={this.state.priority}
                        type="number"
                        label="Priority"
                    /><MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <Grid container justify="space-around">
                            <KeyboardDatePicker
                                disableToolbar
                                variant="inline"
                                format="MM/dd/yyyy"
                                margin="normal"
                                label="Date"
                                value={this.state.date}
                                onChange={this.handleDateChange}
                                KeyboardButtonProps={{
                                    'aria-label': 'change date',
                                }}
                            />
                        </Grid>
                    </MuiPickersUtilsProvider>

                    <Button type="submit">
                        Add #{this.state.items.length + 1}
                    </Button>
                </form>
            </div>
        );
    }

    handleChange(e) {
        this.setState({ text: e.target.value });
    }

    handlePriorityChange(e) {
        this.setState({ priority: e.target.value });
    }

    handleDateChange(e) {
        this.setState({ date: e });
    }

    handleSubmit(e) {
        e.preventDefault();
        if (!this.state.text.length) {
            return;
        }
        const newItem = {
            text: this.state.text,
            dueDate: this.state.date,
            priority: this.state.priority
        };
        this.setState(prevState => ({
            items: prevState.items.concat(newItem),
            text: ''
        }));
    }

}