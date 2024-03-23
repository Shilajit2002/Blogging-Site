import React from 'react'
import AppRouter from './AppRouter/AppRouter'
import UserContextProvider from './Context/UserContextProvider'
import "./App.css"

const App = () => {
  return (
    <>
      <UserContextProvider>
        <AppRouter />
      </UserContextProvider>
    </>
  )
}

export default App

