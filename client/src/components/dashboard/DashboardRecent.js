import {useState, useEffect} from 'react'
import { format } from 'date-fns'
import { Card, Container } from '../../styled-components/styleIndex'

function DashboardRecent() {

    const [ recentTransactions, setRecentTransactions ] = useState([])
    const [ errors, setErrors ] = useState([])

    useEffect(() => {
    fetch (`/transactions/recent`)
        .then(response => response.json())
        .then((data) => {
            if (data.errors){
              console.log("data.errors", data.errors)
                setErrors(data.errors)
                setRecentTransactions([])
            } else {
                console.log("data from recent transactions fetch", data)
                setRecentTransactions(data)
              
            }
        })
    },[])

    let updatedRecentTransactions

    if (recentTransactions > 0 ) {
    const updatedRecentTransactions = 
    recentTransactions.map((transaction) => {
    const formattedDate = format(new Date(transaction.created_at), 'yyyy-MM-dd')
    const formattedTime = format(new Date(transaction.created_at),'pp')
    return (
        <Container>
        <Card key={transaction.id}>
            <h1>${transaction.amount}</h1>
            <h2>{transaction.description}</h2>
            <h5>
                {formattedDate}
                < br/>
                {formattedTime}
                <br />
            </h5>
        </Card>
        </Container>
    ) 
    })}
return (
    <div>
    {recentTransactions > 0 ? {updatedRecentTransactions} : <h1>No Recent Transactions</h1>}
    </div>

    )
    


}

export default DashboardRecent
