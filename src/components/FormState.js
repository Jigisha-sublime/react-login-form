import React, { Fragment } from 'react'
import { useRecoilState } from 'recoil'
import { Button } from 'react-bootstrap'

import { formState } from './Recoil-state/atom'


const FormState = () => {

    const [step, setStep] = useRecoilState(formState)

    const settoSignup = () => {
        setStep(0)
    }
    const settoLogin = () => {
        setStep(1)
    }
    return (
        <Fragment>
            {step !== 2 && (
                <div className="button-container">
                    <Button
                        variant="outline-light"
                        className="px-5"
                        onClick={settoLogin}>Login
                   </Button>
                    <Button
                        variant="outline-light"
                        className="px-5"
                        onClick={settoSignup}>Sign Up
                    </Button>
                </div>)}
        </Fragment>
    )
}

export default FormState
