import React, { Component } from 'react'
import axios from 'axios'

export class EditGoal extends Component {
    state = {
        name: this.props.goal.name,
        description: this.props.goal.description,
        category: this.props.goal.category,
        difficulty: this.props.goal.difficulty,
        importance: this.props.goal.importance,
        progress: this.props.goal.progress,
        complete: this.props.goal.complete,
        finishBy: this.props.goal.finishBy,
        notes: this.props.goal.notes,
        _id: this.props.goal._id
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
        axios.put(`http://localhost:3000/goals/${this.state._id}/`,
            this.state
        )
    }
    render() {
        const goal = this.state
        return (
            <div className="addGoal_form-container">
                <h1>Edit this goal</h1>
                <form onSubmit={this.handleSubmit}>
                    <div className="input-field">
                        <label htmlFor="name">Name</label>
                        <input type="text" id="name" value={goal.name} autoFocus onChange={this.handleChange}/>
                    </div>
                    <div className="input-field">
                        <label htmlFor="description">Description</label>
                        <textarea id="description" value={goal.description} onChange={this.handleChange}/>
                    </div>
                    <div className="selectors">
                    <div className="input-field selector-item">
                        <label htmlFor="category">Category</label>
                        <select id="category" value={goal.category} onChange={this.handleChange}>
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
                        <select id="difficulty" value={goal.difficulty} onChange={this.handleChangeNum}>
                            <option value="1">Painless</option>
                            <option value="2">Meh</option>
                            <option value="3">Tough</option>
                            <option value='4'>Woah!</option>
                        </select>
                    </div>
                    <div className="input-field selector-item">
                        <label htmlFor="importance">Importance</label>
                        <select id="importance" value={goal.importance} onChange={this.handleChange}>
                            <option value="1">Low</option>
                            <option value="2">Medium</option>
                            <option value="3">High</option>
                        </select>
                    </div>
                    </div>
                    <div className="input-field submit">
                        <input className="btn" type="submit" id="addGoal" value="Edit" onSubmit={this.handleSubmit}/>
                    </div>
                </form>
            </div>
        )
    }
}

export default EditGoal