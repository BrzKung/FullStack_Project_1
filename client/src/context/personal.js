import React, { createContext, useReducer } from 'react'

const initialState = {
    personal: null
}

// creat context
const PersonalContext = createContext({
    personal: null,
    getPersonal: () => { },
    clearPersonal: () => { }
})

// reducer
const personalReducer = (state, action) => {
    switch (action.type) {

        case 'GET__PERSONAL':
            return {
                ...state,
                personal: action.payload
            }
        case 'CLEAR__PERSONAL':
            return {
                ...state,
                personal: null
            }

        default:
            return state
    }
}

// Provider
const PersonalProvider = (props) => {
    const [state, dispatch] = useReducer(personalReducer, initialState)

    const getPersonal = (personalData) => {
        dispatch({
            type: 'GET__PERSONAL',
            payload: personalData
        })
    }

    const clearPersonal = () => {
        dispatch({
            type: 'CLEAR__PERSONAL'
        })
    }

    return (
        <PersonalContext.Provider
            value={{ personal: state.personal, getPersonal, clearPersonal }}
            {...props}
        />
    )
}

export { PersonalProvider, PersonalContext }