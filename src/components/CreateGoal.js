import React, { Component } from 'react'
import axios from 'axios'

export class CreateGoal extends Component {
    state = {
        name: '',
        category: 'Life',
        difficulty: 'Painless',
        importance: 'Low',
        progress: 0,
        complete: false,
        steps: [],
        currentStep: ''
    }
    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }
    handleSubmit = (e) => {
        // e.preventDefault();
        const goal = [this.state]
        axios.post(`http://localhost:3000/goals`, {
            goal
        })
    }
    handleStepChange = (e, index) => {
        const steps = this.state.steps
        steps[index] = e.target.value
        this.setState({
            steps
        })
    }
    addStep = (e) => {
        e.preventDefault();
        this.state.steps.push(this.state.currentStep)
        this.setState([
            this.state.steps
        ])
        document.getElementById('currentStep').value = ''
        this.state.currentStep = ''
    }
    deleteStep = (e, index) => {
        // e.preventDefault();
        const steps = this.state.steps
        this.state.steps.splice(index, 1)
        console.log(steps)
        this.setState({
            steps
        })

    }
    render() {
        const stepList = this.state.steps.length ?
            this.state.steps.map((step, index) => {
                return (
                    <div key={index} className="input-field">
                        <label htmlFor="steps">Step {index+1}</label>
                        <input id="steps" value={step} onChange={(e) => {this.handleStepChange(e, index)}}/>
                        <span id="deleteStep" onClick={(e) => {this.deleteStep(e, index)}}>x</span>
                    </div>
                )
            })
        : ""  
        return (
            <div className="addGoal_form-container">
                <h1>Add a new goal</h1>
                <form onSubmit={this.handleSubmit}>
                    <div className="input-field">
                        <label htmlFor="name">Goal Name</label>
                        <input type="text" id="name" autoFocus onChange={this.handleChange}/>
                    </div>
                    {stepList}
                    <div className="input-field">
                        <label htmlFor="currentStep">New Step</label>
                        <input id="currentStep" onChange={this.handleChange}/>
                        <button id="addStep" onClick={this.addStep}>+</button>
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
                        <select id="difficulty" defaultValue="1" onChange={this.handleChange}>
                            <option value="Painless">Painless</option>
                            <option value="Meh">Meh</option>
                            <option value="Tough">Tough</option>
                            <option value='Woah!'>Woah!</option>
                        </select>
                    </div>
                    <div className="input-field selector-item">
                        <label htmlFor="importance">Importance</label>
                        <select id="importance" defaultValue="1" onChange={this.handleChange}>
                            <option value="Low">Low</option>
                            <option value="Medium">Medium</option>
                            <option value="High">High</option>
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