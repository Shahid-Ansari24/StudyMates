import React, { Children, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const PrivateRoute = ({children}) => {
  const {token} = useSelector((state) => state.auth)
  const navigate = useNavigate()
  
  return token ? children : navigate('/')
}

export default PrivateRoute
