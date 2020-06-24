import React, { useState } from 'react'
import { useSetRecoilState } from 'recoil'
import { Container, Form, Row, Col, Button, Card } from 'react-bootstrap';

import { signupDetails, formState } from './Recoil-state/atom'


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
  const changeLoginCard = useSetRecoilState(formState)

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
      errorMessage.fname = 'First Name is required'
    }
    if (!lname || !lname.trim().length) {
      isValidInput = false
      errorMessage.lname = 'Last Name is required'
    }
    if (!email || !email.trim().length) {
      isValidInput = false;
      errorMessage.email = 'Email address is required';
    } else {
      let lastAtPos = email.lastIndexOf('@');
      let lastDotPos = email.lastIndexOf('.');
      if (!(lastAtPos < lastDotPos && lastAtPos > 0 && email.indexOf('@@') === -1 && lastDotPos > 2 && (email.length - lastDotPos) > 2)) {
        isValidInput = false;
        errorMessage.email = 'Invalid email address';
      }
    }
    if (!password || !password.trim().length) {
      isValidInput = false
      errorMessage.password = 'Password is required'
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

  const changeToLogin = () => {
    changeLoginCard(1)
  }

  const toggleShow = () => {
    setShowPassword(!showPassword)
  }

  const { fname, lname, email, password } = state

  return (
    <Card className="py-3">
      <Card.Header className="no-border">
        <Container fluid>
          <Card.Title className="d-flex justify-content-center">
            Sign Up
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
                    type="text"
                    placeholder="First Name"
                    name="fname"
                    value={fname}
                    onChange={onValueChange}
                    className={error.fname ? "show-error" : ""} />
                  {error.fname && <Form.Text className="text-danger">{error.fname}</Form.Text>}
                </Form.Group>
              </Col>
              <Col>
                <Form.Group>
                  <Form.Control
                    type="text"
                    placeholder="Last Name"
                    name="lname"
                    value={lname}
                    onChange={onValueChange}
                    className={error.lname ? "show-error" : ""} />
                  {error.lname && <Form.Text className="text-danger">{error.lname}</Form.Text>}
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group>
                  <Form.Control
                    type="email"
                    placeholder="Email address"
                    name="email"
                    value={email}
                    onChange={onValueChange}
                    className={error.email ? "show-error" : ""} />
                  {error.email && <Form.Text className="text-danger">{error.email}</Form.Text>}
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group>
                  <Form.Control
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    name="password"
                    value={password}
                    onChange={onValueChange}
                    className={error.password ? "show-error" : ""} />
                  <Button
                    className="icon-style"
                    variant="light"
                    size="sm"
                    onClick={toggleShow}>
                    {showPassword ? "Hide" : "Show"}
                  </Button>
                  {error.password && <Form.Text className="text-danger">{error.password}</Form.Text>}
                </Form.Group>
              </Col>
            </Row>
          </Form>
        </Container>
      </Card.Body>
      <Card.Footer className="no-border">
        {displayMessge && <Card.Text className="message">You have registered successfully ! </Card.Text>}
        <Container fluid>
          <Button size="lg" block onClick={submitForm}>
            Sign Up
          </Button>
        </Container>
      </Card.Footer>
      <Container>
        <Card.Text>Already have an account ? <Card.Link onClick={changeToLogin}>Login</Card.Link> </Card.Text>
      </Container>
    </Card>
  )
}

export default Register
