import React, { useContext } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Home from './Pages/Home'
import Login from './Pages/Login'
import SignUp from './Pages/SignUp'
import { UserDataContext } from './context/UserContext'

function App() {
  const { userData } = useContext(UserDataContext)
  const isAuthenticated = Boolean(userData)

  return (
    <div>
      <Routes>
        <Route path='/' element={isAuthenticated ? <Home /> : <Navigate to='/login' />} />
        <Route path='/signup' element={!isAuthenticated ? <SignUp /> : <Navigate to='/' />} />
        <Route path='/login' element={!isAuthenticated ? <Login /> : <Navigate to='/' />} />
      </Routes>
    </div>
  )
}

export default App
