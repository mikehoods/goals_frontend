import React, { Component } from 'react'
import axios from 'axios'

export class CreateGoal extends Component {
    state = {
        name: '',
        description: '',
        category: 'Life',
        difficulty: 1,
        importance: 1,
        progress: 0,
        complete: false,
        finishBy: null,
        notes: ''
    }
    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }
    handleChangeNum = (e) => {
        this.setState({
            [e.target.id]: parseInt(e.target.value)
        })
    }
    handleSubmit = (e) => {
        // e.preventDefault();
        const goal = [this.state]
        axios.post(`http://localhost:3000/goals`, {
            goal
        })
        console.log(goal)
    }
    render() {
        return (
            <div className="addGoal_form-container">
                <h1>Add a new goal</h1>
                <form onSubmit={this.handleSubmit}>
                    <div className="input-field">
                        <label htmlFor="name">Name</label>
                        <input type="text" id="name" autoFocus onChange={this.handleChange}/>
                    </div>
                    <div className="input-field">
                        <label htmlFor="description">Description</label>
                        <textarea id="description" onChange={this.handleChange}/>
                    </div>
                    <div className="selectors">
                    <div className="input-field selector-item">
                        <label htmlFor="category">Category</label>
                        <select id="category" defaultValue="Life" onChange={this.handleChange}>
                            <option value="Life">Life</option>
                            <option value="Love">Love</option>
                            <option value="Happiness">Happiness</option>
                            <option value="Health">Health</option>
                            <option value="Work">Work</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>
                    <div className="input-field selector-item">
                        <label htmlFor="difficulty">Difficulty</label>
                        <select id="difficulty" defaultValue="1" onChange={this.handleChangeNum}>
                            <option value="1">Painless</option>
                            <option value="2">Meh</option>
                            <option value="3">Tough</option>
                            <option value='4'>Woah!</option>
                        </select>
                    </div>
                    <div className="input-field selector-item">
                        <label htmlFor="importance">Importance</label>
                        <select id="importance" defaultValue="1" onChange={this.handleChange}>
                            <option value="1">Low</option>
                            <option value="2">Medium</option>
                            <option value="3">High</option>
                        </select>
                    </div>
                    </div>
                    <div className="input-field submit">
                        <input className="btn" type="submit" id="addGoal" value="+" onSubmit={this.handleSubmit}/>
                    </div>
                </form>
            </div>
        )
    }
}

export default CreateGoal