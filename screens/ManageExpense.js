import React, { useContext, useEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native';
import IconButton from '../UI/IconButton';
import { GlobalStyles } from '../constants/styles';
import Button from '../UI/Button';
import { ExpensesContext } from '../stores/expenses_context';
import ExpenseForm from '../components/ManageExpense/ExpenseForm';
import { storeExpense } from '../util/http';

function ManageExpense({ route, navigation }) {
  const expensesCtx = useContext(ExpensesContext);

  const expenseId = route.params?.expenseId;
  const isEditing = !!expenseId;
  const selectedExpense = expensesCtx.expenses.find((expense) => expense.id === expenseId );

  useEffect(() => {
    navigation.setOptions({title: isEditing ? 'Edit Expense' : 'Add Expense'})
  }, [navigation, isEditing]);

  function deleteExpenseHandler(){
    expensesCtx.deleteExpense(expenseId);
    navigation.goBack();
  }
  function cancelHandler(){
    navigation.goBack();
  }
  async function confirmHandler(expenseData){
    if(isEditing){
      expensesCtx.updateExpense(
        expenseId,  
        expenseData,
      );
    } else {
      const id = await storeExpense(expenseData);
      expensesCtx.addExpense({ ...expenseData, id: id });
    }
    navigation.goBack();
  }
  return (
    <View style={styles.container}>
      <ExpenseForm
        onCancel={cancelHandler}
        onSubmit={confirmHandler}
        submitButtonLabel={isEditing ? 'Update' : 'Add'}
        onEditValues={selectedExpense}
      />
      {isEditing&&(
        <View style={styles.deleteContainer}>
          <IconButton
            icon='trash'
            color={GlobalStyles.colors.error500}
            size={36}
            onPress={deleteExpenseHandler}
          />
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary800
  },
  deleteContainer: {
    marginTop: 10,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.primary200,
    alignItems: 'center'
  },
});

export default ManageExpense