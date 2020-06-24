import React, { useState } from 'react'
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { Card, Container, Form, Row, Col, Button } from 'react-bootstrap';

import { signupDetails, formState } from './Recoil-state/atom';

const Login = () => {

  const initialState = {
    email: '',
    password: ''
  }

  const [state, setState] = useState(initialState)
  const [showPassword, setShowPassword] = useState(false)

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

  const toggleShow = () => {
    setShowPassword(!showPassword)
  }

  const changeToSignup = () => {
    setFormState(0)
  }

  const { email, password } = state

  return (
    <Card className="py-3 card-stretch">
      <Card.Header className="no-border">
        <Container fluid>
          <Card.Title className="d-flex justify-content-center">
            Login
          </Card.Title>
        </Container>
      </Card.Header>
      <Card.Body className="no-border">
        <Container fluid>
          <Form>
            <Row>
              <Col>
                <Form.Group>
                  <Form.Control
                    type="email"
                    placeholder="Email address"
                    name="email"
                    value={email}
                    onChange={onValueChange}
                    className={errMessage.email ? "show-error" : ""} />
                  {errMessage.email && <Form.Text className="text-danger">{errMessage.email}</Form.Text>}
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group>
                  <div className="password-show-btn">
                    <Form.Control
                      type={showPassword ? "text" : "password"}
                      placeholder="Password"
                      name="password"
                      value={password}
                      onChange={onValueChange}
                      className={errMessage.password ? "show-error" : ""} />
                    <div className="icon-container">
                      <Button
                        variant="light"
                        className="icon-style"
                        size="sm"
                        onClick={toggleShow}>
                        {showPassword ? "hide" : "show"}
                      </Button>
                    </div>
                  </div>
                  {errMessage.password && <Form.Text className="text-danger">{errMessage.password}</Form.Text>}
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group controlId="formBasicCheckbox">
                  <Form.Check type="checkbox" label="Remember me" style={{ textAlign: 'initial' }} />
                </Form.Group>
              </Col>
            </Row>
          </Form>
        </Container>
      </Card.Body>
      <Card.Footer className="no-border">
        <Container fluid>
          <Button size="lg" block onClick={LoginUser}>
            Login
          </Button>
        </Container>
      </Card.Footer>
      <Container>
        <Card.Text>Don't have an account ? <Card.Link onClick={changeToSignup} >Sign Up</Card.Link> </Card.Text>
      </Container>
    </Card>
  )
}

export default Login
