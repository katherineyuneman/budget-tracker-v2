import React from 'react'
import { CartCardStyle, HomeContainer } from '../../styled-components/styleIndex'
import format from 'date-fns/format';

function TransactionCard({onTransactionDelete, transaction:{id, description,budget_id,category_description, amount, created_at, month_desc, year}}) {

    const handleDeleteClick = () => {
        fetch(`/transactions/${id}`, {
            method: "DELETE",
        });
        
        onTransactionDelete(id)
    }

    const formattedDate = format(new Date(created_at), 'yyyy-MM-dd')
    const formattedTime = format(new Date(created_at),'pp')

  return (
    <CartCardStyle>
        <h2>{description}</h2>
            <h3>{month_desc} {year}</h3>
            <h2 className="amount">
                $-{parseFloat(amount).toFixed(2)}
            </h2>
            <h5>
                {formattedDate}
                <br />
                {formattedTime}
                <br/></h5>
                <h3>{category_description}</h3>
            
            <br/>
            <button onClick={()=>{handleDeleteClick(id)}}>🗑</button>
    </CartCardStyle>
  )
}

export default TransactionCard