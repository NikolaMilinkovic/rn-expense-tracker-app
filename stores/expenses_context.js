import React, { createContext, useState, useReducer } from 'react'

export const ExpensesContext = createContext({
  expenses: [],
  setExpenses: (expenses) => {},
  addExpense: ({ description, amount, date }) => {},
  deleteExpense: (id) => {},
  updateExpense: (id, { description, amount, date }) => {},
});

function expensesReducer(state, action){
  switch(action.type){
    case 'SET':
      const reversed = action.payload.reverse();
      return reversed;
    case 'ADD':
      return [{ ...action.payload }, ...state]
    case 'UPDATE':

      // Pronalazimo index itema koji zelimo da update
      const updatableExpenseIndex = state.findIndex((expense) => expense.id === action.payload.id);

      // Uzimamo item iz iz state putem pronadjenog indeksa
      const updatableExpenseItem = state[updatableExpenseIndex]

      // Pravimo novi objekat koji uzima atribute postojeceg itema i mergujemo nove vrednosti
      const updatedItem = { ...updatableExpenseItem, ...action.payload.data }

      // Pravimo novi niz koji ce da zameni state
      const updatedExpenses = [...state];

      // Unutar novog niza zamenjujemo objekat na indeksu [updatableExpenseIndex] sa novim objektom koji sadrzi prethodne i nove vrednosti
      updatedExpenses[updatableExpenseIndex] = updatedItem
      return updatedExpenses;
    case 'DELETE':
      return state.filter((expense) => expense.id !== action.payload);
    default:
      return state;
  }
}

export default function ExpensesContextProvider({ children }){
  const [expensesState, dispatch] = useReducer(expensesReducer, []);

  function addExpense(expenseData){
    dispatch({ type: 'ADD', payload: expenseData });
  }

  function deleteExpense(id){
    dispatch({ type: 'DELETE', payload: id })
  }

  function updateExpense(id, expenseData){
    dispatch({ type: 'UPDATE', payload: {
      id: id,
      data: expenseData
    } })
  }

  function setExpenses(expenses){
    dispatch({ type: 'SET', payload: expenses })
  }

  const value = {
    expenses: expensesState,
    setExpenses: setExpenses,
    addExpense: addExpense,
    deleteExpense: deleteExpense,
    updateExpense: updateExpense
  }

  return (
    <ExpensesContext.Provider value={value}>{children}</ExpensesContext.Provider>
  )
}