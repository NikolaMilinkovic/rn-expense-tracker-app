import React from 'react'
import { FlatList } from 'react-native'
import ExpenseItem from './ExpenseItem'

function ExpensesList({ expenses }) {
  // description, amount, date
  function renderExpenseItem(itemData){
    return (
      <ExpenseItem
        description={itemData.item.description}
        amount={itemData.item.amount}
        date={itemData.item.date}
        id={itemData.item.id}
      />
    )
  }

  return (
    <FlatList data={expenses} keyExtractor={(item) => item.id} renderItem={renderExpenseItem}/>
  )
}

export default ExpensesList