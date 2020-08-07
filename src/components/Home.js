import React, { Component } from 'react';
import GoalForm from './GoalForm'

class Home extends Component {
    state = {
        goals: [],
        completion: 0
    }
    // componentDidMount(){
    //     axios.get('localhost:3000')
    // }
    render(){
        const yourGoals = this.state.goals
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
                    <h1 className="noGoals">I have no goals...</h1>
                </div>
            </div>
            
        )
    }
}

export default Home