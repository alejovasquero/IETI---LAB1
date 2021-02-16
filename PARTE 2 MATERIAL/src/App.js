import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { TodoList } from "./TodoList";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from "moment";
import { Login } from './components/Login.js'
import { TodoApp } from './components/TodoApp.js'
import { BrowserRouter, BrowserRouter as Router, Link, Route } from 'react-router-dom'

const LoginView = () => (
    <Login />
);

const TodoAppView = () => (
    <TodoApp />
);

class App extends Component {

    constructor(props) {
        super(props);
        this.state = { items: [], text: '', priority: 0, dueDate: moment(), isLoggedIn: false };
        this.handleTextChange = this.handleTextChange.bind(this);
        this.handlePriorityChange = this.handlePriorityChange.bind(this);
        this.handleDateChange = this.handleDateChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.checkAuthentication = this.checkAuthentication.bind(this);
    }

    componentDidMount() {
        this.saveCredentials();
        this.checkAuthentication();
    }

    saveCredentials() {
        localStorage.setItem('username', 'david');
        localStorage.setItem('password', 'vasquez');
    }


    checkAuthentication() {
        const loggedIn = localStorage.getItem('isLoggedIn');
        if (loggedIn) {
            this.setState({
                isLoggedIn:
                    JSON.parse(loggedIn) === true ? true : false
            }, () => { console.log(this.state.isLoggedIn) });
        } else {
            this.setState({ isLoggedIn: false });
        }
    }

    render() {
        return (
            <Router>
                <div className="App">
                    <header className="App-header">
                        <img src={logo} className="App-logo" alt="logo" />
                        <h1 className="App-title">TODO React App</h1>
                    </header>

                    <br />
                    <br />

                    <div>
                        <ul>
                            <li><Link to="/">Login</Link></li>
                            {
                                this.state.isLoggedIn &&
                                <li><Link to="/todo">Todo</Link></li>
                            }
                        </ul>

                        <div>
                            <Route exact path="/" component={LoginView} />
                            {
                                this.state.isLoggedIn &&
                                <Route path="/todo" component={TodoAppView} />
                            }
                        </div>
                    </div>

                </div>
            </Router>
        );
    }

    handleTextChange(e) {
        this.setState({
            text: e.target.value
        });
    }

    handlePriorityChange(e) {
        this.setState({
            priority: e.target.value
        });
    }

    handleDateChange(date) {
        this.setState({
            dueDate: date
        });
    }

    handleSubmit(e) {

        e.preventDefault();

        if (!this.state.text.length || !this.state.priority.length || !this.state.dueDate)
            return;

        const newItem = {
            text: this.state.text,
            priority: this.state.priority,
            dueDate: this.state.dueDate,

        };
        this.setState(prevState => ({
            items: prevState.items.concat(newItem),
            text: '',
            priority: '',
            dueDate: ''
        }));
    }


}

export default App;
