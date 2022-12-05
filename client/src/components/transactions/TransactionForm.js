import { useState, useEffect } from "react"
import {useNavigate } from "react-router-dom"
import { HomeContainer, PopupCheckout } from "../../styled-components/styleIndex"


function TransactionForm() {
    const [ categories, setCategories ] = useState([])
    const [transactionInputs, setTransactionInputs] = useState ({
        description:"",
        amount:"",
        date_created: "",
        category_id: "",
        budget_id:""
    })

    const [budgets, setBudgets] = useState([])

    useEffect(() => {
        fetch ('/budgets')
        .then(response => response.json())
        .then(data => {
        setBudgets(data)
        })
        .catch(err => alert(err))

        fetch ('/categories')
        .then(response => response.json())
        .then(data => {
        setCategories(data)
        })
        .catch(err => alert(err))
    },[])

  const updatedBudgets = budgets.map((budget) => {
    const newObj = {amount: budget.amount, id: budget.id, month: budget.month.month_desc, year: budget.month.year}
    return newObj
  })
    const navigate = useNavigate()

    const budgetOptions = updatedBudgets.map((budget) => 
        <option key={budget.id} value={budget.id}>{budget.month} {budget.year}</option>
        )

    const categoryOptions = categories.map((category) => 
    <option key={category.id} value={category.id}>{category.description}</option>
    )

    const handleInputChange = e => {

       setTransactionInputs({
           ...transactionInputs,
           [e.target.name]: e.target.value})
    }

  const handleSubmit = e => {
      e.preventDefault()


    const newTransaction ={
          description: transactionInputs.description,
          amount: transactionInputs.amount,
          category_id: transactionInputs.category_id,
          budget_id: transactionInputs.budget_id
      }

      fetch('/transactions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body:JSON.stringify(newTransaction)
        })
        .then(resp => resp.json())
        .then((data) => {
            if (data.errors){
                alert(data.errors)
            } else {
                console.log(data)
                navigate("/transactions")
            }
        })
        
  }

  return (
    <HomeContainer>
    <PopupCheckout>
        <div>Add a new transaction. </div>
        <form onSubmit={handleSubmit}>
        <label>Transaction Description:
              <input type="text" name="description" value={transactionInputs.description} maxLength={100} required onChange={handleInputChange}/>
            </label>
            <br />
            <label>Budget Month: 
                <select name="budget_id" value={transactionInputs.budget_id} required onChange={handleInputChange}>
                    <option name="default" value="default">Select Budget Month</option>
                    {budgetOptions}
                </select>
            </label>
            <br/>
            <label>Amount Spent:
              <input type="decimal" name="amount" value={transactionInputs.amount} maxLength={10} required onChange={handleInputChange}/>
            </label>
            <br />
            <label>Category
                <select name="category_id" value={transactionInputs.category_id} required onChange={handleInputChange}>
                    <option name="default" value="default">Select Transaction Category</option>
                    {categoryOptions}
                </select>
            </label>
            <br/>
              <button>Add Transaction</button>
        </form>
        </PopupCheckout>
    </HomeContainer>
  )
}

export default TransactionForm
