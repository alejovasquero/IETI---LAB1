import React from 'react';
import { Todo } from './Todo';

export class TodoList extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        const myList = this.props.todoList.map((todo, i) =>{
            return (
            <Todo key={i}
                text={todo.text}
                priority={todo.priority}
                dueDate={todo.dueDate}>
            </Todo>
            )
        })
        return (
          <div>{myList}</div>
        );
    }

}