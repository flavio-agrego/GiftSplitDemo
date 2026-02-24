import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { useSelector } from 'react-redux'

import LoginScreen from '../screens/LoginScreen'
import RegisterScreen from '../screens/RegisterScreen'
import BuscarListasScreen from '../screens/BuscarListasScreen'

const Stack = createNativeStackNavigator()

export default function AppNavigator() {

  const user = useSelector(state => state.user)

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>

        {!user.uid ? (
          <>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
          </>
        ) : (
          <Stack.Screen name="Demo" component={BuscarListasScreen} />
        )}

      </Stack.Navigator>
    </NavigationContainer>
  )
}