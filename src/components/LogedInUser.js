import React from 'react'
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { Card, Container, Button, Row } from 'react-bootstrap';

import { signupDetails, formState } from '../components/Recoil-state/atom';

const LogedInUser = () => {
    const userData = useRecoilValue(signupDetails)
    const logoutState = useSetRecoilState(formState)

    const logOut = () => {
        logoutState(0)
    }

    const { fname, lname, email } = userData;

    return (
        <Card className="py-3 card-stretch my-5">
            <Card.Header>
                <Container fluid>
                    <Card.Title className="d-flex justify-content-center">
                        Welcome {fname} {lname}
                    </Card.Title>
                </Container>
            </Card.Header>
            <Card.Body className="no-border m-auto">
                <Container fluid>
                    <Row>
                        First Name : {fname}
                    </Row>
                    <Row>
                        Last Name : {lname}
                    </Row>
                    <Row>
                        Email Id : {email}
                    </Row>
                </Container>
            </Card.Body>
            <Card.Footer className="no-border">
                <Container fluid>
                    <Button variant="secondary" size="sm"  onClick={logOut}>
                        Logout
                    </Button>
                </Container>
            </Card.Footer>
        </Card>
    )
}

export default LogedInUser