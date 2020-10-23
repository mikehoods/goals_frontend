import React, { Component } from 'react'
import axios from 'axios'

export class EditGoal extends Component {
    state = {
        name: this.props.goal.name,
        category: this.props.goal.category,
        difficulty: this.props.goal.difficulty,
        importance: this.props.goal.importance,
        progress: this.props.goal.progress,
        complete: this.props.goal.complete,
        steps: this.props.goal.steps,
        _id: this.props.goal._id
    }
    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
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
        // this.state.currentStep = ''
    }
    deleteStep = (e, index) => {
        e.preventDefault();
        const steps = this.state.steps
        steps.splice(index, 1)
        this.setState({
            steps
        })
    }
    moveStepDown = (e, step, index) => {
        e.preventDefault();
        const steps = this.state.steps
        steps.splice(index + 2, 0, step)
        steps.splice(index, 1)
        this.setState({
            steps
        })
    }
    moveStepUp = (e, step, index) => {
        e.preventDefault();
        const steps = this.state.steps
        steps.splice(index - 1, 0, step)
        steps.splice(index + 1, 1)
        this.setState({
            steps
        })
    }
    handleSubmit = (e) => {
        e.preventDefault();
        axios.put(`https://react-goal-tracker.herokuapp.com/goals/${this.state._id}/`,
            this.state
        )
        this.props.handler();
    }
    handleCancel = (e) => {
        e.preventDefault();
        this.props.handler();
    }
    render() {
        const goal = this.state
        const stepsLength = this.state.steps.length
        const stepList = this.state.steps.length ?
            this.state.steps.map((step, index) => {
                return (
                    <div key={index} className="input-field">
                        <label htmlFor="steps">Step {index+1}</label>
                        <div className="input-step">
                        <input id="steps" value={step} onChange={(e) => {this.handleStepChange(e, index)}}/>
                        {index > 0 && index !== stepsLength -1 ?
                            <div className="buttons-step">
                            <button className="stepButton"><i className="material-icons" onClick={(e) => {this.moveStepUp(e, step, index)}}>arrow_drop_up</i></button>
                            <button className="downButton stepButton"><i className="material-icons" onClick={(e) => {this.moveStepDown(e, step, index)}}>arrow_drop_down</i></button>
                        </div>
                            : 
                            index > 0 && index === stepsLength - 1 ?
                            <button className="stepButton"><i className="material-icons" onClick={(e) => {this.moveStepUp(e, step, index)}}>arrow_drop_up</i></button>
                                :
                                index === 0 && stepsLength > 1 ?
                                    <button className="stepButton"><i className="material-icons" onClick={(e) => {this.moveStepDown(e, step, index)}}>arrow_drop_down</i></button>
                                    :
                                    ""
                        } 
                        <button className="stepButton" id="deleteStep" onClick={(e) => {this.deleteStep(e, index)}}>x</button>
                        </div>
                    </div>
                )
            })
        : ""  
        return (
            <div className="addGoal_form-container">
                <h1>Edit this goal</h1>
                <form onSubmit={this.handleSubmit}>
                    <div className="input-field">
                        <label htmlFor="name">Goal Name</label>
                        <input type="text" id="name" value={goal.name} autoFocus onChange={this.handleChange}/>
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
                        <select id="difficulty" value={goal.difficulty} onChange={this.handleChange}>
                            <option value="Painless">Painless</option>
                            <option value="Moderate">Moderate</option>
                            <option value="Tough">Tough</option>
                            <option value='Woah!'>Woah!</option>
                        </select>
                    </div>
                    <div className="input-field selector-item">
                        <label htmlFor="importance">Importance</label>
                        <select id="importance" value={goal.importance} onChange={this.handleChange}>
                            <option value="Low">Low</option>
                            <option value="Medium">Medium</option>
                            <option value="High">High</option>
                        </select>
                    </div>
                    </div>
                    <div className="input-field submit">
                        <button className="btn" onClick={this.handleCancel}>Cancel</button>
                        <input className="btn" type="submit" id="addGoal" value="Edit" onSubmit={this.handleSubmit}/>
                    </div>
                </form>
            </div>
        )
    }
}

export default EditGoal