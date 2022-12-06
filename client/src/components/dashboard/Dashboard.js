import { Link } from "react-router-dom"
import { useState, useEffect } from "react"
import { HomeContainer, Container } from "../../styled-components/styleIndex";

import DashboardCharts from "./DashboardCharts";
import DashboardRecent from "./DashboardRecent";


const Dashboard = () => {

    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    const month_desc = months[new Date().getMonth()]

    const [currentBudget, setCurrentBudget] = useState([])
    const [ currentTotalTransactions, setCurrentTotalTransactions ] = useState(0)
    const [ maxTransaction, setMaxTransaction ] = useState(0)
    const [loading, setLoading] = useState(true)
    const [ errors, setErrors ] = useState([])

    useEffect(() => {
    fetch (`/budgetsummary/${month_desc}`)
    .then(response => response.json())
    .then((data) => {
        if (data.errors){
          console.log(data.errors)
            setErrors(data.errors)
            // setCurrentBudget([])
            setLoading(true)
        } else {
            setCurrentBudget(data)
            setLoading(false)
        }
    })
    fetch (`/budgetsummary/${month_desc}/max_spend`)
    .then(response => response.json())
    .then((data) => {
        if (data.errors){
          console.log(data.errors)
            setErrors(data.errors)
            setMaxTransaction(0)
            setLoading(false)
        } else {
            setMaxTransaction(data)
          console.log(data)
        }
    })
    },[])

    useEffect(() => {
    fetch (`/budgets/${currentBudget.id}/transactions/sum`)
    .then(response => response.json())
    .then(data => {
        setCurrentTotalTransactions(data)
        setLoading(false)
    })
    .catch(err => alert(err))
    },[currentBudget])

    if (loading) return <h1>Loading...</h1>

 
    // logic for displaying either budget data or prompt to add new budget if one is missing this month

    if (currentBudget.length !== 0) {

    return (
        <HomeContainer>
            <h1>{month_desc} Budget Summary</h1>
            <DashboardCharts 
                currentBudget={currentBudget}
                currentTotalTransactions={currentTotalTransactions}
                month_desc={month_desc}
                maxTransaction={maxTransaction}
            />
            <Link to={`/budgets/${currentBudget.id}/transactions`}>
                <button>Review your {month_desc} transactions {'>>'} </button>
            </Link>
                <br/>
                <br/>
            <Link to="/transactions/new">
                <button>Add a new transaction {'>>'} </button>
            </Link> 

            <h2>Recent Transactions</h2>
            <Container>
                <DashboardRecent />
            </Container>

            <Link to="/transactions">
            <h2>...See All Transactions</h2>
            </Link>
        </HomeContainer>
    )
    } else { 
    return (
        <HomeContainer>
            <h1>{month_desc} Budget Summary</h1>
            <div>
                <h2>You don't have a budget yet!</h2>
                <Link to="/budgets/new">
                    <button>Add a new budget for {month_desc} {'>>'} </button>
                </Link>
            </div>
        <h2>Recent Transactions</h2>
            <DashboardRecent />

        <Link to="/transactions">
            <h2>...See All Transactions</h2>
        </Link>
        </HomeContainer>
  
    )}
}
export default Dashboard