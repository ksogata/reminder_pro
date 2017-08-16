import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addReminder, deleteReminder, clearReminders } from '../actions';
import moment from 'moment';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text: '',
            dueDate: '',
        };
        
        this.handleChange = this.handleChange.bind(this);
    }
    
    addReminder() {
        this.props.addReminder(this.state.text, this.state.dueDate);
    }
    
    deleteReminder(id) {
        this.props.deleteReminder(id);
    }
    
    handleChange(e) {
        this.setState({
           [e.target.name]: e.target.value 
        });
    }
    
    renderReminders() {
        const { reminders } = this.props;
        return (
            <ul className="list-group col-sm-4">
                {
                    reminders.map(reminder => {
                        return (
                            <li key={reminder.id} className="list-group-item">
                                <div className="list-item">
                                    <div>{reminder.text}</div>
                                    <div>
                                        <em>{
                                            moment(new Date(reminder.dueDate)).fromNow()
                                        }</em>
                                    </div>
                                </div>
                                <div 
                                    className="list-item delete-button"
                                    onClick={() => this.deleteReminder(reminder.id)}
                                >
                                    &#x2715;
                                </div>
                            </li>
                        )
                    })
                }
            </ul>
        )
    }
    
    render() {
        return(
            <div className="App">
                <div className="title">
                    Things I have to do.
                </div>
            
                <div className="form-inline reminder-form">
                    
                    <div className="form-group">
                        <input
                            className="form-control"
                            placeholder="I have to..."
                            name="text"
                            onChange={ this.handleChange }
                            onKeyPress={event => {
                                if (event.key === 'Enter') {
                                    this.addReminder();
                                }
                            }}
                        />
                        <input
                            className="form-control"
                            type="datetime-local"
                            name="dueDate"
                            onChange={ this.handleChange }
                        />
                    </div>
                    
                    <button
                        type="button"
                        className="btn btn-success"
                        onClick={() => this.addReminder()}
                    >
                        Add Reminder
                    </button>
                    
                    <div 
                        className="btn btn-danger"
                        onClick={() => this.props.clearReminders()}
                    >
                        Clear Reminders
                    </div>
                </div>
                { this.renderReminders() }
            </div>
        );   
    }
}

function alertUserWhenDatePassed(state) {
    for (let k in state) {
        if (state.hasOwnProperty(k)) {
            let dueDate = new Date(state[k].dueDate);
            let today = new Date();
          
            if (dueDate < today) {
                alert("The due date for reminder: \"" + state[k].text + "\", has passed.");
            }
        }
    }
}

function mapStateToProps(state) {
    alertUserWhenDatePassed(state);
    return {
        reminders: state
    }
}

export default connect(mapStateToProps, { addReminder, deleteReminder, clearReminders })(App);