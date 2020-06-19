import React from 'react'
import { useRecoilValue } from 'recoil';

import Login from './Login'
import Register from './Register'
import LogedInUser from './LogedInUser'
import { formState } from './Recoil-state/atom'

const Home = () => {

  const step = useRecoilValue(formState)

  switch (step) {
    case 0:
      return <Register />
    case 1:
      return <Login />
    case 2:
      return <LogedInUser />
    default:
      return <Register />
  }
}

export default Home
