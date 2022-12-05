import { useState, useEffect } from "react"
import TransactionsList from "../components/transactions/TransactionsList";
import { ProductFeatureContainer, DropDown, SearchStyle, HomeContainer } from "../styled-components/styleIndex";


function TransactionsContainer() {
  const [transactions, setTransactions] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch ('/transactions')
    .then(response => response.json())
    .then(data => {
      setTransactions(data)
      setLoading(false)
    })
    .catch(err => alert(err))
  },[])

  if (loading) return <h1>Loading...</h1>

  function handleDeleteTransaction(id) {
    const updatedTransactions = transactions.filter((transaction) => transaction.id !== id);
    setTransactions(updatedTransactions);
  }
  
  return (
    <div>
      <ProductFeatureContainer>
        <h2>All Transactions</h2>
      <TransactionsList transactions={transactions} onTransactionDelete={handleDeleteTransaction}/>
      </ProductFeatureContainer>
    </div>
  )
}

export default TransactionsContainer





