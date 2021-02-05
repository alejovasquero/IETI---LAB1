import React from 'react';

export class Todo extends React.Component {

    constructor(props) {
        super(props);
    }   

    render() {
        return (  
          <div>
              <h1>{this.props.text}</h1>
              <h2>{this.props.priority}</h2>
              <h3>{this.props.dueDate.toString()}</h3>
          </div>
        );
    }

}