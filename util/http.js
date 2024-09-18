import axios from "axios";
import { BACKEND_URL } from "@env"

export async function storeExpense(expenseData){
  console.log('> Storing new expense')
  console.log(`Epense data is: ${expenseData}`)
  console.log(`Backedn Url is: ${BACKEND_URL}`)
  const response = await axios.post(
    `${BACKEND_URL}/expenses.json`, 
    expenseData
  );
  const id = response.data.name;
  return id;
}

export async function getExpenses(){
  console.log('> Fetching all expenses')
  console.log(`Backedn Url is: ${BACKEND_URL}`)
  const response =  await axios.get(
    `${BACKEND_URL}/expenses.json`
  );
  console.log(`Response is: ${response}`)

  const expenses = [];
  for(const key in response.data){
    const expenseObj = {
      id: key,
      amount: response.data[key].amount,
      date: new Date(response.data[key].date),
      description: response.data[key].description
    }
    expenses.push(expenseObj);
  }

  console.log(`Fetched expenses are: ${expenses}`)

  return expenses;
}