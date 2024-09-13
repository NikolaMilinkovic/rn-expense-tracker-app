import React, { useEffect, useState } from 'react'
import { View, TextInput, StyleSheet, Text, Alert } from 'react-native'
import Input from './Input'
import Button from '../../UI/Button';
import { getFormattedDate } from '../../util/date';
import { GlobalStyles } from '../../constants/styles';

function ExpenseForm({ onCancel, onSubmit, submitButtonLabel, onEditValues }) {
  const [inputs, setInputs] = useState({
    amount: { 
      value: onEditValues ? onEditValues.amount.toString() : '', 
      isValid: true,
    },
    date: { 
      value: onEditValues ? getFormattedDate(onEditValues.date) : '',
      isValid: true,
    },
    description: { 
      value: onEditValues ? onEditValues.description : '', 
      isValid: true,
    }
  });

  function onChangeHandler(inputIdentifier, enteredValue){
    setInputs((curr) => {
      return {
        ...curr,
        [inputIdentifier]: { value: enteredValue, isValid: true },
      }
    });
  }

  function submitHandler(){
    const expenseData = {
      amount: +inputs.amount.value,
      date: new Date(inputs.date.value),
      description: inputs.description.value,
    }

    const isAmountValid = !isNaN(expenseData.amount) && expenseData.amount > 0;
    const isDateValid = expenseData.date.toString() !== 'Invalid Date';
    const isDescriptionValid = expenseData.description.trim().length > 0;

    if(isAmountValid && isDateValid && isDescriptionValid){
      onSubmit(expenseData);
    } else {
      setInputs((curr) => {
        return {
          amount: {
            value: curr.amount.value, isValid: isAmountValid 
          },
          date: {
            value: curr.date.value, isValid: isDateValid 
          },
          description: {
            value: curr.description.value, isValid: isDescriptionValid 
          },
        }
      })

      return;
    }

  }

  const formIsInvalid = 
    !inputs.amount.isValid || 
    !inputs.date.isValid || 
    !inputs.description.isValid;

  return (
    <View style={styles.form}>
      <Text style={styles.title}>Your Expense</Text>
      <View style={styles.amountDateContainer}>
      <Input 
        invalid={!inputs.amount.isValid} 
        label='Amount' 
        style={{flex: 1}} 
        textInputConfig={{
          keyboardType: 'decimal-pad',
          // This is how we send the first parameter, second parameter is sent automatically
          onChangeText: onChangeHandler.bind(this, 'amount'),
          value: inputs.amount.value,
        }}/>
      <Input 
        invalid={!inputs.date.isValid} 
        label='Date' 
        style={{flex: 1}} 
        textInputConfig={{
          placeholder: 'YYYY-MM-DD',
          maxLength: 10,
          onChangeText: onChangeHandler.bind(this, 'date'),
          value: inputs.date.value,
        }}/>
      </View>
      <Input 
        invalid={!inputs.description.isValid} 
        label='Description' 
        textInputConfig={{
          multiline: true,
          autoCorrect: true,
          onChangeText: onChangeHandler.bind(this, 'description'),
          value: inputs.description.value,
        }}/>
      {formIsInvalid && (
        <Text style={styles.errorText}>Invalid input values, please check your entered data.</Text>
      )}
      <View style={styles.buttonsContainer}>
        <Button style={styles.button} onPress={submitHandler}>{submitButtonLabel}</Button>
        <Button style={styles.button} mode="flat" onPress={onCancel}>Cancel</Button>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  form: {
    marginTop: 60,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginVertical: 24,
  },
  amountDateContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    minWidth: 120,
    marginHorizontal: 8
  },
  errorText: {
    textAlign: 'center',
    color: GlobalStyles.colors.error500,
    margin: 8,
  }
});

export default ExpenseForm