import React, { Component } from 'react';
import axios from 'axios'
import CreateGoal from './CreateGoal'
import EditGoal from './EditGoal'
import { withAuth0 } from '@auth0/auth0-react'

class Home extends Component {
    constructor(props) {
        super(props)
        this.handler = this.handler.bind(this)
        this.addGoalhander = this.addGoalhander.bind(this)
    }
    state = {
        goals: [],
        formToggle: "",
        completeGoals: '',
        filterByCat: "",
        filterByDiff: "",
        filterByImp: "",
        filteredGoals: [],
        completionPercentage: 0,
        displayGoals: ""
    }
    addGoalhander(newGoal) {
        const currentDate = new Date();
        const formatDate = (date) => {
            date = new Date(date);
            const day = date.getDate();
            const month = date.getMonth() + 1;
            const year = date.getFullYear();
            return `${month}/${day}/${year}`
        }
        const goal = {...newGoal, createdAt: formatDate(currentDate)};
        console.log(goal)
        const date = new Date()
        console.log(date)
        this.setState({
            goals: [...this.state.goals, goal],
            filteredGoals: [...this.state.goals, goal],
        })
        this.handleDisplayGoals();
    }
    handler() {
        this.setState({
            formToggle: <CreateGoal handler={this.addGoalhander}/>
        })
        this.handleDisplayGoals();
    }
    componentWillMount(){
        axios.get('http://localhost:4000/goals')
            .then(res => {
                this.setState({
                    goals: res.data.filter(g => g.username === this.props.auth0.user.name),
                    filteredGoals: res.data.filter(g => g.username === this.props.auth0.user.name),
                    formToggle: <CreateGoal 
                        handler={this.addGoalhander} 
                        />
                })
            }).then( res => {
                const goals = this.state.goals
                const completedGoalsArr = goals.filter(g => g.complete === true);
                const completedGoals = completedGoalsArr.length;
                console.log(completedGoals)
                this.handleDisplayGoals();
                const completionPercent = goals.length > 0 ?
                    parseInt(((completedGoals / goals.length) * 100).toFixed(0))
                    : 0;
                this.setState({
                    completionPercentage: completionPercent
                })
            })
    }
    handleDelete = (id) => {
        axios.delete(`https://react-goal-tracker.herokuapp.com/goals/${id}/`)
            .then(()=> {
                this.setState({
                    filteredGoals: this.state.filteredGoals.filter(g => g._id !== id),
                    goals: this.state.goals.filter(g => g._id !== id),
                    formToggle: <CreateGoal 
                        handler={this.addGoalhander} 
                        />
                })
                this.handleDisplayGoals();
                this.calculateCompletion();
            })
    }
    handleDisplayGoals = () => {
        const formatDate = (date) => {
            date = new Date(date);
            const day = date.getDate();
            const month = date.getMonth() + 1;
            const year = date.getFullYear();
            return `${month}/${day}/${year}`
        }
        const goals = this.state.goals;
        const filteredGoals = this.state.filteredGoals;
        const noGoalsFound = goals.length ?
        <h1 className="noGoals">No goals found.</h1>
        : <h1 className="noGoals">Try setting some new goals.</h1>;
        const goalsList = filteredGoals.length > 0 ? (
            filteredGoals.map((goal, index) => {
                return (
                    <div className="goal card" key={goal._id}>
                        <div className="card-content">
                            <div className="goal-header">
                                <h3>{goal.name}</h3>
                                <div className="goal-icons">
                                    <i className="material-icons" onClick={()=> {this.handleComplete(goal, index)}}>done</i>
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
        ) : noGoalsFound;
        this.setState({
            displayGoals: goalsList
        })
    }
    handleFilterGoals = () => {
        const { goals, filterByCat, filterByDiff, filterByImp } = this.state
        let filteredGoals = goals
        filteredGoals = filteredGoals.filter(goal => goal.category.includes(filterByCat))
        filteredGoals = filteredGoals.filter(goal => 
            goal.difficulty.includes(filterByDiff) 
            && goal.importance.includes(filterByImp))
        this.setState({
            filteredGoals: filteredGoals
        })
    }
    handleFilterCat = async (e) => {
        await this.setState({
            filterByCat: e.target.value,
        })
        this.handleFilterGoals()
    }
    handleFilterDiff = async (e) => {
        await this.setState({
            filterByDiff: e.target.value,
        })
        this.handleFilterGoals()
    }
    handleFilterImp = async (e) => {
        await this.setState({
            filterByImp: e.target.value,
        })
        this.handleFilterGoals()
    }
    calculateCompletion() {
        const goals = this.state.goals
        const completedGoalsArr = goals.filter(g => g.complete === true);
        const completedGoals = completedGoalsArr.length;
        console.log(completedGoals)
        const completionPercent = goals.length > 0 ?
            parseInt(((completedGoals / goals.length) * 100).toFixed(0))
            : 0;
        this.setState({
            completionPercentage: completionPercent
        })
    }
    handleComplete = (goal, index) => {
        const goals = this.state.goals
        goal.complete = !goal.complete
        goals[index] = goal
        axios.put(`https://react-goal-tracker.herokuapp.com/goals/${goals[index]._id}/`, 
            goal
            )
            .then(()=> {
                this.setState({
                    goals
                })
            })
        this.calculateCompletion();  
    }
    handleEdit = (goal) => {
        this.setState({
            formToggle: <EditGoal handler={this.handler} goal={goal}/>
        })
    }
    render(){        
        return (
            <div className="home-container">
                <div className="side-container">
                    <div className="addGoal-container">
                        {this.state.formToggle}
                    </div>
                    <div className="filterGoals-container">
                        <h1>Filter your goals</h1>
                        <form>
                            <label className="filter-label" htmlFor="filterByCat">By Category: </label>
                            <select id="filterByCat" onChange={this.handleFilterCat}>
                                <option value="">All</option>
                                <option value="Life">Life</option>
                                <option value="Love">Love</option>
                                <option value="Happiness">Happiness</option>
                                <option value="Health">Health</option>
                                <option value="Work">Work</option>
                                <option value="Other">Other</option>
                            </select>
                        </form>
                        <form>
                            <label className="filter-label" htmlFor="filterByDiff">By Difficulty: </label>
                            <select id="filterByDiff" onChange={this.handleFilterDiff}>
                                <option value="">All</option>
                                <option value="Painless">Painless</option>
                                <option value="Moderate">Moderate</option>
                                <option value="Tough">Tough</option>
                                <option value="Woah!">Woah!</option>
                            </select>
                        </form>
                        <form>
                            <label className="filter-label" htmlFor="filterByImp">By Importance: </label>
                            <select id="filterByImp" onChange={this.handleFilterImp}>
                                <option value="">All</option>
                                <option value="Low">Low</option>
                                <option value="Medium">Medium</option>
                                <option value="High">High</option>
                            </select>
                        </form>
                    </div>
                    <div className="progress-container">
                        <h2>You've completed <span className="totalCompletion"> {this.state.completionPercentage}% </span> of your goals so far!</h2>
                    </div>
                </div>
                <div className="goals-container">
                    <h1 className="myGoals-h1">My Goals</h1>
                    {/* <div className="goals-buttons">
                        <button>Pending</button>
                        <button>Complete</button>
                        <button>All</button>
                    </div> */}
                    {this.state.displayGoals}
                </div>
            </div>
            
        )
    }
}

export default withAuth0(Home)