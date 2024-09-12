import React, { createContext, useState, useReducer } from 'react'

const DUMMY_EXPENSES = [
  {
    id: 'e1',
    description: 'A pair of shoes',
    amount: 59.99,
    date: new Date('2021-12-19')
  },
  {
    id: 'e2',
    description: 'A pair of trousers',
    amount: 420.69,
    date: new Date('2022-1-23')
  },
  {
    id: 'e3',
    description: 'Banans',
    amount: 69.99,
    date: new Date('2023-12-1')
  },
  {
    id: 'e4',
    description: 'Kuruma',
    amount: 1269.99,
    date: new Date('2023-5-12')
  },
  {
    id: 'e5',
    description: 'c4',
    amount: 169.99,
    date: new Date('2022-6-22')
  }
];

export const ExpensesContext = createContext({
  expenses: [],
  addExpense: ({ description, amount, date }) => {},
  deleteExpense: (id) => {},
  updateExpense: (id, { description, amount, date }) => {},
});

function expensesReducer(state, action){
  switch(action.type){
    case 'ADD':
      const id = new Date().toString() + Math.random().toString();
      const payload = action.payload;
      payload.id = id;
      return [{ ...payload }, ...state]
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
  const [expensesState, dispatch] = useReducer(expensesReducer, DUMMY_EXPENSES);

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

  const value = {
    expenses: expensesState,
    addExpense: addExpense,
    deleteExpense: deleteExpense,
    updateExpense: updateExpense
  }

  return (
    <ExpensesContext.Provider value={value}>{children}</ExpensesContext.Provider>
  )
}