import { useEffect } from 'react'
import { Provider } from 'react-redux'
import { store } from './redux/store'
import MainNavigator from './src/navigation/MainNavigator'
import { initDB } from './src/database/localDB'

export default function App() {

  useEffect(() => {
    initDB()
  }, [])

  return (
    <Provider store={store}>
      <MainNavigator />
    </Provider>
  )
}