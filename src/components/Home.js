import React, { Component } from 'react';
import axios from 'axios'
import GoalForm from './GoalForm'

class Home extends Component {
    state = {
        goals: [],
        completion: 0,
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
                    goals: this.state.goals.filter(g => g._id !== id)
                })
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
        const howImportant = (num) => {
            const ImportanceArr = ["Low", "Medium", "High"]
            let importance = ImportanceArr[num -1]
            return importance
        }
        const goals = this.state.goals
        const yourGoals = goals.length ? (
            goals.map(goal => {
                return (
                    <div className="goal card" key={goal._id}>
                        <div className="card-content">
                            <h3>{goal.name}</h3>
                            <h4 className="goal-createdAt">{formatDate(goal.createdAt)}</h4>
                            <p>{goal.description}</p>
                            <ul>
                                <li>Category: {goal.category}</li>
                                <li>Difficulty: {goal.difficulty}</li>
                                <li>Importance: {howImportant(goal.importance)}</li>
                            </ul>
                            <div className="goal-icons">
                                <i className="material-icons">done</i>
                                <i className="material-icons">edit</i>
                                <i className="material-icons" onClick={()=> {this.handleDelete(goal._id)}}>delete_forever</i>
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
                        <h1>Add a new goal</h1>
                        <GoalForm/>
                    </div>
                    <div className="filterGoals-container">
                        <form>
                            <label className="filter-label">View your goals in: </label>
                            <select>
                                <option>Everything</option>
                                <option>Life</option>
                                <option>Love</option>
                                <option>Happiness</option>
                                <option>Health</option>
                                <option>Work</option>
                                <option>Other</option>
                            </select>
                        </form>
                    </div>
                    <div className="progress-container">
                        <h2>You've completed <span className="totalCompletion"> {this.state.completion}% </span> of your goals so far!</h2>
                    </div>
                </div>
                <div className="goals-container">
                    <h1>My Goals</h1>
                    {yourGoals}
                </div>
            </div>
            
        )
    }
}

export default Home