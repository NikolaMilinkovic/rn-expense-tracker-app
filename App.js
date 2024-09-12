import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ManageExpense from './screens/ManageExpense';
import RecentExpenses from './screens/RecentExpenses';
import AllExpenses from './screens/AllExpenses';
import { GlobalStyles } from './constants/styles';
import { Ionicons } from '@expo/vector-icons';
import IconButton from './UI/IconButton';
import ExpensesContextProvider, { ExpensesContext } from './stores/expenses_context';

const Stack = createNativeStackNavigator();
const BottomTabs = createBottomTabNavigator();

function NestedBottomTabs(){
  return (
  <BottomTabs.Navigator screenOptions={({ navigation }) => ({
    headerStyle: { backgroundColor: GlobalStyles.colors.primary500 },
    headerTintColor: 'white',
    tabBarStyle: { backgroundColor: GlobalStyles.colors.primary500 },
    tabBarActiveTintColor: GlobalStyles.colors.accent500,
    headerRight: ({tintColor}) => {
      return (
        <IconButton
          icon='add'
          size={24}
          color={tintColor}
          onPress={() => {navigation.navigate('ManageExpense')}}
        />
      )
    }
  })}>
    <BottomTabs.Screen name="RecentExpenses" component={RecentExpenses} options={{
      title: 'Recent Expenses',
      tabBarLabel: 'Recent',
      tabBarIcon: (color) => <Ionicons name='hourglass' size={22} color={color}/>,
    }}/>
    <BottomTabs.Screen name="AllExpenses" component={AllExpenses} options={{
      title: 'All Expenses',
      tabBarLabel: 'All Expenses',
      tabBarIcon: (color) => <Ionicons name='calendar' size={22} color={color}/>
    }}/>
  </BottomTabs.Navigator>
)
}

export default function App() {
  return (
    <>
      <StatusBar style='light'/>
      <ExpensesContextProvider>
        <NavigationContainer>
          <Stack.Navigator initialRouteName='NestedBottomTabs' screenOptions={{
            headerStyle: {
              backgroundColor: GlobalStyles.colors.primary500,
            },
            headerTintColor: 'white',
          }}>
            <Stack.Screen name="NestedBottomTabs" component={NestedBottomTabs} options={{
              headerShown: false,
            }}/>
            <Stack.Screen name="ManageExpense" component={ManageExpense} options={{
              presentation: 'modal'
            }}/>
          </Stack.Navigator>
        </NavigationContainer>
      </ExpensesContextProvider>
    </>
  );
}