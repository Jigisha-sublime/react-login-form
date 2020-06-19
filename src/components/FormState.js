import React, { Fragment } from 'react'
import { useRecoilState } from 'recoil'
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
                    <button type="button" className="btn" onClick={settoLogin}>
                        Login
                    </button>
                    <button type="button" className="btn" onClick={settoSignup}>
                        Sign Up
                     </button>
                </div>)}
        </Fragment>
    )
}

export default FormState
