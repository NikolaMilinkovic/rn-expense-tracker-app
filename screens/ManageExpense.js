import React, { useContext, useEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native';
import IconButton from '../UI/IconButton';
import { GlobalStyles } from '../constants/styles';
import Button from '../UI/Button';
import { ExpensesContext } from '../stores/expenses_context';

function ManageExpense({ route, navigation }) {
  const expensesCtx = useContext(ExpensesContext);

  const expenseId = route.params?.expenseId;
  const isEditing = !!expenseId;
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
  function confirmHandler(){
    if(isEditing){
      expensesCtx.updateExpense(
        expenseId,  
        {
          description: 'Updated expense', 
          amount: 420.99,
          date: new Date('2024-9-24')
        }
      );
    } else {
      expensesCtx.addExpense({
        description: 'Test', 
        amount: 69.99,
        date: new Date('2024-9-22')
      });
    }
    navigation.goBack();
  }
  return (
    <View style={styles.container}>
      <View style={styles.buttonsContainer}>
        <Button style={styles.button} onPress={confirmHandler}>{isEditing ? 'Update' : 'Add'}</Button>
        <Button style={styles.button} mode="flat" onPress={cancelHandler}>Cancel</Button>
      </View>
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
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    minWidth: 120,
    marginHorizontal: 8
  }
});

export default ManageExpense