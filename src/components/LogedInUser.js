import React from 'react'
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { signupDetails, formState } from '../components/Recoil-state/atom'

const LogedInUser = () => {
    const userData = useRecoilValue(signupDetails)
    const logoutState = useSetRecoilState(formState)

    const logOut = () => {
        logoutState(0)
    }

    const { fname, lname, email } = userData;

    return (
        <div className="user-details">
            <h1>Welcome {fname} {lname} </h1>
            <hr />
            <h4>
                <span style={{ color: "black" }}>First Name : </span>
                <span style={{ color: "grey" }}>{fname}</span>
            </h4>
            <h4>
                <span style={{ color: "black" }}>Last Name : </span>
                <span style={{ color: "grey" }}>{lname}</span>
            </h4>
            <h4>
                <span style={{ color: "black" }}>Email Id : </span>
                <span style={{ color: "grey" }}>{email}</span>
            </h4>
            <button type="button" className="btn" onClick={logOut}>
                Logout
            </button>
        </div>
    )
}

export default LogedInUser