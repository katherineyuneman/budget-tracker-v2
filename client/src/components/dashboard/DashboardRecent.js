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
              console.log(data.errors)
                setErrors(data.errors)
                setRecentTransactions([])
            } else {
                setRecentTransactions(data)
              console.log(data)
            }
        })
    },[])

    
    if (recentTransactions.length > 0){
    const recentTransactionsMapped = recentTransactions.map((transaction) => {
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
    })
} else {return <Container><h1>No Transactions</h1></Container>}
  
}

export default DashboardRecent
