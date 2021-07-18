import React, { createContext, useReducer } from 'react'
import jwtDecode from 'jwt-decode'

// ค่าเริ่มต้นก่อน login
const initialState = {
    user: null
}

// ถ้ามี token ใน localStorage
if (localStorage.getItem('authToken')) {

    // นำข้อมูลใน token มาใช้ (id,username,...)
    const decodedToken = jwtDecode(localStorage.getItem('authToken'))

    // ถ้า token หมดอายุ
    if (decodedToken.exp * 1000 < Date.now()) {
        // ลบ token ออกจาก localStorage
        localStorage.removeItem('authToken')
    } else {
        // เอาไปเก็บไว้ที่ initialState
        initialState.user = decodedToken
    }
}

// ให้ context เก็บค่าเริ่มต้น user, login, logout 
const AuthContext = createContext({
    user: null,
    login: () => { },
    logout: () => { }
})

// Reducer
const AuthReducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN':
            return {
                ...state,
                user: action.payload
            }

        case 'LOGOUT':
            return {
                ...state,
                user: null
            }

        default:
            return state
    }
}

// Provider
const AuthProvider = (props) => {

    // นำ Reducer มาใช้
    const [state, dispatch] = useReducer(AuthReducer, initialState)

    // เมื่อมีการ login รับ userData จาก server
    const login = (userData) => {

        // นำ jwtToken ไปเก็บที่ localStorage
        localStorage.setItem('authToken', userData.token)

        // ใช้งาน Reducer
        dispatch({
            type: 'LOGIN',
            // ส่ง userData ไปเก็บไว้ใน context
            payload: userData
        })
    }

    // เมื่อมีการ logout
    const logout = () => {

        // ลบ jwtToken จาก localStorage
        localStorage.removeItem('authToken')

        // ใช้งาน Reducer
        dispatch({
            type: 'LOGOUT'
        })
    }

    // ส่งไป App.js
    return (
        <AuthContext.Provider
            value={{ user: state.user, login, logout }}
            // เผื่อมีการส่งค่า props
            {...props}
        />
    )
}

export { AuthContext, AuthProvider }
