import React from 'react'
import { TextInput, View, StyleSheet, Text } from 'react-native'
import { GlobalStyles } from '../../constants/styles';

function Input({ label, style, textInputConfig, invalid }) {
  const inputStyles = [styles.input];
  if(textInputConfig && textInputConfig.multiline){
    inputStyles.push(styles.inputMultiline)
  }
  return (
    <View style={[styles.inputContainer, style]}>
      <Text style={[styles.label, invalid ? styles.invalidLabel : null]}>{label}</Text>
      <TextInput style={[inputStyles, invalid ? styles.invalidInputStyle : null]} {...textInputConfig}/>
    </View>
  )
}

const styles = StyleSheet.create({
  inputContainer: {
    marginHorizontal: 4,
    marginVertical: 8,
  },
  label: {
    fontSize: 12,
    color: GlobalStyles.colors.primary100,
    marginBottom: 4,
  },
  input: {
    backgroundColor: GlobalStyles.colors.primary100,
    padding: 6,
    borderRadius: 6,
    fontSize: 18,
    color: GlobalStyles.colors.primary700,
  },
  inputMultiline: {
    minHeight: 100,
    textAlignVertical: 'top'
  },
  invalidLabel: {
    color: GlobalStyles.colors.error500
  },
  invalidInputStyle: {
    backgroundColor: GlobalStyles.colors.error50
  }
});

export default Input