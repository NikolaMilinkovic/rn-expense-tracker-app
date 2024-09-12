import React, { useContext } from 'react'
import { Text } from 'react-native'
import ExpensesOutput from '../components/ExpensesOutput/ExpensesOutput'
import { ExpensesContext } from '../stores/expenses_context'
import { getDateMinusDays } from '../util/date';

function RecentExpenses() {

  const expensesCtx = useContext(ExpensesContext);
  const recentExpenses = expensesCtx.expenses.filter((expense) => {
    const today = new Date();
    const date7DaysAgo = getDateMinusDays(today, 7);

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