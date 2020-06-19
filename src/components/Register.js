import React, { useState } from 'react'
import { useSetRecoilState } from 'recoil'
import { FaRegEyeSlash, FaRegEye } from "react-icons/fa";
import loginImg from "../assets/login.svg";
import { signupDetails } from './Recoil-state/atom'


const Register = () => {

  const initialState = {
    fname: '',
    lname: '',
    email: '',
    password: ''
  }

  const [state, setState] = useState(initialState)
  const [error, setError] = useState({})
  const [displayMessge, setDisplayMessge] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const setSubmitData = useSetRecoilState(signupDetails)

  const onValueChange = (e) => {
    setDisplayMessge(false)
    setState({
      ...state,
      [e.target.name]: e.target.value
    })
    setError({
      ...error,
      [e.target.name]: ''
    })
  }

  const validateForm = () => {
    let isValidInput = true
    let errorMessage = {
      fname: '',
      lname: '',
      email: '',
      password: ''
    }
    if (!fname || !fname.trim().length) {
      isValidInput = false
      errorMessage.fname = '* First Name is required'
    }
    if (!lname || !lname.trim().length) {
      isValidInput = false
      errorMessage.lname = '* Last Name is required'
    }
    if (!email || !email.trim().length) {
      isValidInput = false;
      errorMessage.email = '* Email address is required';
    } else {
      let lastAtPos = email.lastIndexOf('@');
      let lastDotPos = email.lastIndexOf('.');
      if (!(lastAtPos < lastDotPos && lastAtPos > 0 && email.indexOf('@@') === -1 && lastDotPos > 2 && (email.length - lastDotPos) > 2)) {
        isValidInput = false;
        errorMessage.email = '* Invalid email address';
      }
    }
    if (!password || !password.trim().length) {
      isValidInput = false
      errorMessage.password = '* Password is required'
    }
    setError(errorMessage)
    return isValidInput;
  }

  const submitForm = (e) => {
    setDisplayMessge(false)
    e.preventDefault();
    const isValidForm = validateForm()

    if (isValidForm) {
      setSubmitData(state)
      setState(initialState)
      setDisplayMessge(true)
    }
  }

  const toggleShow = () => {
    setShowPassword(!showPassword)
  }

  const { fname, lname, email, password } = state

  return (
    <div className="container">
      <div className="base-container">
        <div className="header">Sign Up</div>
        <div className="content">
          <div className="image">
            <img src={loginImg} alt="Login" />
          </div>
          <form>
            <div className="form" >
              <div className="form-group">
                <label htmlFor="fname">First Name *</label>
                {error.fname && <span className="required-error">{error.fname}</span>}
                <input
                  type="text"
                  name="fname"
                  placeholder="First Name"
                  value={fname}
                  onChange={onValueChange} />
              </div>
              <div className="form-group">
                <label htmlFor="lname">Last Name *</label>
                {error.lname && <span className="required-error">{error.lname}</span>}
                <input
                  type="text"
                  name="lname"
                  placeholder="Last Name"
                  value={lname}
                  onChange={onValueChange} />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email *</label>
                {error.email && <span className="required-error">{error.email}</span>}
                <input
                  type="text"
                  name="email"
                  placeholder="Email Address"
                  value={email}
                  onChange={onValueChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password *</label>
                {error.password && <span className="required-error">{error.password}</span>}
                <span style={{ display: 'flex' }}>
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Password"
                    value={password}
                    onChange={onValueChange}
                  />
                  {showPassword ? <FaRegEyeSlash size={'25px'} color={'grey'} className="icon-style" onClick={toggleShow} />
                    : <FaRegEye size={'25px'} color={'grey'} className="icon-style" onClick={toggleShow} />}
                </span>
              </div>
            </div>
            {displayMessge && <span className="message">You have registered successfully ! <br /></span>}
            <div className="footer">
              <button type="button" className="btn large-btn" onClick={submitForm}>
                Sign Up
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Register
