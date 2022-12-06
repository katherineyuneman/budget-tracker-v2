import { setMonth } from "date-fns/esm"
import { useState, useEffect } from "react"
import {useNavigate } from "react-router-dom"
import { HomeContainer, PopupCheckout } from "../../styled-components/styleIndex"


function BudgetForm() {

    const [ userOptions, setUserOptions ] = useState([])
    const [ monthOptions, setMonthOptions ] = useState([])
    const [ error, setError ] = useState({})

    const [budgetInputs, setBudgetInputs] = useState ({
        amount:"",
        month_id:"",
        user_id:""
    })

    useEffect(() => {
        fetch ('/users')
        .then(response => response.json())
        .then((data) => {
            if (data.error){
              console.log("data error", data.error)
                setError(data.error)
                setUserOptions([])
            } else {
                setUserOptions(data)
            }
        })

        fetch ('/months')
        .then(response => response.json())
        .then((data) => {
            if (data.error){
              console.log("data error", data.error)
                setError(data.error)
                setUserOptions([])
            } else {
                setMonthOptions(data)
            }
        })
      }
      ,[])

    const navigate = useNavigate()

    const handleInputChange = e => {
       setBudgetInputs({
           ...budgetInputs,
           [e.target.name]: e.target.value})
    }

  const handleSubmit = e => {
      e.preventDefault()

    const newBudget ={
          month_id: budgetInputs.month_id,
          amount: budgetInputs.amount,
          user_id: budgetInputs.user_id
      }

      fetch('/budgets', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body:JSON.stringify(newBudget)
        })
        .then(resp => resp.json())
        .then((data) => {
            if (data.errors){
                alert(data.errors)
            } else {
                navigate("/budgets")
            }
        })
        // .catch(error => alert(error))
  }

  const monthDropDownOptions = monthOptions.map((month) => 
        <option key={month.id} value={month.id}>{month.month_desc} {month.year}</option>
        )

    const userDropDownOptions = userOptions.map((user) => 
        <option key={user.id} value={user.id}>{user.first_name} {user.last_name}</option>
        )
        
  return (
    <HomeContainer>
    <PopupCheckout>
        <div>Add a new budget amount. </div>
        <form onSubmit={handleSubmit}>
            <label>State: 
                <select name="month_id" value={budgetInputs.budget_id} required onChange={handleInputChange}>
                    <option value="default">Select Budget Month</option>
                    {monthDropDownOptions}
                </select>
            </label> 
            <br/>
            <label>Budget Limit $
              <input type="decimal" name="amount" value={budgetInputs.amount} maxLength={10} required onChange={handleInputChange}/>
            </label>
            <br/>
            <label>User:
                <select name="user_id" value={budgetInputs.budget_id} required onChange={handleInputChange}>
                    <option name="default" value="default">Select User</option>
                    {userDropDownOptions}
                </select>
            </label>
            <br/>
              <button>Add Budget</button>
        </form>
        </PopupCheckout>
        </HomeContainer>
  )
}

export default BudgetForm
