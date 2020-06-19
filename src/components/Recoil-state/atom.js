import { atom } from 'recoil';

export const formState = atom({
    key: "formState",
    default: 0
})

export const signupDetails = atom({
    key: 'signupDetails',
    default: {}
})