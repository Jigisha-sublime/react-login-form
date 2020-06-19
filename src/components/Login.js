import React, { useState } from 'react'
import { useRecoilValue, useSetRecoilState } from 'recoil';

import loginImg from "../assets/login.svg";
import { signupDetails, formState } from './Recoil-state/atom';

const Login = () => {

    const initialState = {
        email: '',
        password: ''
    }

    const [state, setState] = useState(initialState)
    const [errMessage, setErrMessage] = useState({})
    const savedData = useRecoilValue(signupDetails)
    const setFormState = useSetRecoilState(formState)




    const validateForm = () => {
        let isValidInput = true
        let errorMessage = {
            email: '',
            password: ''
        }
        if (!email || !email.trim().length) {
            isValidInput = false;
            errorMessage.email = '* Email cant be empty';
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
        setErrMessage(errorMessage)
        return isValidInput;
    }



    const LoginUser = (e) => {
        e.preventDefault();
        const savedEmail = savedData.email
        const savedPassword = savedData.password
        const isValidForm = validateForm()

        if (isValidForm) {
            if (email === savedEmail && password === savedPassword) {
                setFormState(2)
            } else if (email === savedEmail && password !== savedPassword) {
                setErrMessage({ password: '* Incorrect Password ' })
                setState({
                    ...state,
                    password: ''
                })
            } else {
                setErrMessage({ email: '* Email Not Found please sign up' })
                setState(initialState)
            }
        }
    }

    const onValueChange = (e) => {
        setErrMessage('')
        setState({
            ...state,
            [e.target.name]: e.target.value
        })
    }

    const { email, password } = state
    return (
        <div className="container">
            <div className="base-container">
                <div className="header">Login</div>
                <div className="content">
                    <div className="image">
                        <img src={loginImg} alt="Login" />
                    </div>
                    <form >
                        <div className="form">
                            <div className="form-group">
                                <label htmlFor="email">Email Address * </label>
                                {errMessage.email && <span className="required-error">{errMessage.email}</span>}
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
                                {errMessage.password && <span className="required-error">{errMessage.password}</span>}
                                <input
                                    type="password"
                                    name="password"
                                    placeholder="password"
                                    value={password}
                                    onChange={onValueChange}
                                />
                            </div>
                        </div>
                        <div className="footer">
                            <button type="button" className="btn large-btn" onClick={LoginUser}>
                                Login
                             </button>
                        </div>
                    </form>
                </div>

            </div>
        </div>
    )
}

export default Login
