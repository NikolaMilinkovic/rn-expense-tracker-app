import React, { useContext, useEffect, useState } from 'react'
import { Text } from 'react-native'
import ExpensesOutput from '../components/ExpensesOutput/ExpensesOutput'
import { ExpensesContext } from '../stores/expenses_context'
import { getDateMinusDays } from '../util/date';
import { getExpenses } from '../util/http';

function RecentExpenses() {
  const expensesCtx = useContext(ExpensesContext);
  
  useEffect(() => {
    async function getAllExpenses(){
      const expenses = await getExpenses();
      console.log(`Fetched expenses are ${expenses}`)
      expensesCtx.setExpenses(expenses);
    } 
    console.log('> Calling get Expense method from RecentExpenses')
    getAllExpenses();
  }, [])

  const recentExpenses = expensesCtx.expenses.filter((expense) => {
    const today = new Date();
    const date7DaysAgo = getDateMinusDays(today, 7);

    console.log(`Filtering an expense: ${expense.date}`)
    return (expense.date >= date7DaysAgo) && (expense.date < today);
  });
  return (
    <ExpensesOutput 
      expensesPeriod="Last 7 Days"
      expenses={recentExpenses}
      fallbackText='There are no recent expenses to show.'
    />
  )
}

export default RecentExpenses