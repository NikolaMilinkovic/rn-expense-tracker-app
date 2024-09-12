import React, { useContext } from 'react'
import { Text } from 'react-native'
import ExpensesOutput from '../components/ExpensesOutput/ExpensesOutput'
import { ExpensesContext } from '../stores/expenses_context';

function AllExpenses() {
  const expensesCtx = useContext(ExpensesContext);
  return (
    <ExpensesOutput 
      expensesPeriod="Total"
      expenses={expensesCtx.expenses}
      fallbackText='There are absolutely no expenses here.'
    />
  )
}

export default AllExpenses