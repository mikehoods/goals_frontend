import React, { Component } from 'react';
import axios from 'axios'
import CreateGoal from './CreateGoal'
import EditGoal from './EditGoal'

class Home extends Component {
    state = {
        goals: [],
        completion: 0,
        filterBy: "",
        formToggle: <CreateGoal/>
    }
    componentDidMount(){
        axios.get('http://localhost:3000/goals')
            .then(res => {
                // console.log(res.data)
                this.setState({
                    goals: res.data
                })
            })
    }
    handleDelete = (id) => {
        console.log(id)
        axios.delete(`http://localhost:3000/goals/${id}/`)
            .then(()=> {
                this.setState({
                    goals: this.state.goals.filter(g => g._id !== id),
                    formToggle: <CreateGoal/>
                })
            })
    }
    handleFilter = (e) => {
        console.log(e.target.value)
        this.setState({
            filterBy: e.target.value,
        })
    }
    handleEdit = (goal) => {
        this.setState({
            formToggle: <EditGoal goal={goal}/>
        })
    }
    render(){
        const formatDate = (date) => {
            date = new Date(date);
            const day = date.getDate();
            const month = date.getMonth() + 1;
            const year = date.getFullYear();
            return `${month}/${day}/${year}`
        }
        const goals = this.state.goals
        const yourGoals = goals.length ? (
            goals.filter(goal => goal.category.includes(this.state.filterBy)).map(goal => {
                return (
                    <div className="goal card" key={goal._id}>
                        <div className="card-content">
                            <div className="goal-header">
                                <h3>{goal.name}</h3>
                                <div className="goal-icons">
                                    <i className="material-icons">done</i>
                                    <i className="material-icons" onClick={()=> {this.handleEdit(goal)}}>edit</i>
                                    <i className="material-icons" onClick={()=> {this.handleDelete(goal._id)}}>delete_forever</i>
                                </div>
                            </div>
                            <h4 className="goal-createdAt">{formatDate(goal.createdAt)}</h4>
                            <ol>
                                {goal.steps.map((step, index) => {
                                    return(
                                        <li key={index}>{step}</li>
                                    )
                                })}
                            </ol>
                            <div className="goal-footer">
                                <div className="goal-footer-item">Category: {goal.category}</div>
                                <div className="goal-footer-item">Difficulty: {goal.difficulty}</div>
                                <div className="goal-footer-item">Importance: {goal.importance}</div>
                            </div>
                        </div>
                    </div>
                )
            })
        ) : (
            <h1 className="noGoals">I have no goals...</h1>
        )
        return (
            <div className="home-container">
                <div className="side-container">
                    <div className="addGoal-container">
                        {this.state.formToggle}
                    </div>
                    <div className="filterGoals-container">
                        <form>
                            <label className="filter-label" htmlFor="filterBy">View your goals in: </label>
                            <select id="filterBy" onChange={this.handleFilter}>
                                <option value="">Everything</option>
                                <option value="Life">Life</option>
                                <option value="Love">Love</option>
                                <option value="Happiness">Happiness</option>
                                <option value="Health">Health</option>
                                <option value="Work">Work</option>
                                <option value="Other">Other</option>
                            </select>
                        </form>
                    </div>
                    <div className="progress-container">
                        <h2>You've completed <span className="totalCompletion"> {this.state.completion}% </span> of your goals so far!</h2>
                    </div>
                </div>
                <div className="goals-container">
                    <h1 className="myGoals-h1">My Goals</h1>
                    {yourGoals}
                </div>
            </div>
            
        )
    }
}

export default Home