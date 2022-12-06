import { useState, useEffect } from "react"
import BudgetsList from "../components/budgets/BudgetsList"
import { Link } from 'react-router-dom'
import { ProductFeatureContainer, DropDown, SearchStyle, HomeContainer } from "../styled-components/styleIndex";
import BudgetForm from "../components/budgets/BudgetForm";

function BudgetsContainer() {
  const [budgets, setBudgets] = useState([])
  const [loading, setLoading] = useState(true)
  const [ errors, setErrors ] = useState([])

  useEffect(() => {
    fetch ('/budgets')
    .then(response => response.json())
    .then((data) => {
      if (data.error){
        console.log("data error", data.error)
          setErrors(data.errors)
          setBudgets([])
          setLoading(true)
      } else {
          setBudgets(data)
          setLoading(false)
      }
  })
  },[])

  
  if (loading) return <h1>Loading...</h1>
  

  const handleBudgetDelete = (id) => {
    const removalOfBudget = budgets.filter((budget) => budget.id !== id);
    setBudgets(removalOfBudget);
  }

  let updatedBudgets

  if (budgets.length > 0 || budgets === 'errors') {
    updatedBudgets = budgets.map((budget) => {
      const newObj = {amount: budget.amount, id: budget.id, month: budget.month.month_desc, year: budget.month.year}
      return newObj
    })
}


  return (
    <div>
      <HomeContainer>
      <Link to={"/budgets/new"}>
        <button>Add New Budget {'>>'} </button>
      </Link>
      </HomeContainer>
      <BudgetsList updatedBudgets={updatedBudgets} onBudgetDelete={handleBudgetDelete}/>
    </div>
  )
}

export default BudgetsContainer
