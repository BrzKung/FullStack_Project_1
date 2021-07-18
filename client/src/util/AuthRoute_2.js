import React, { useContext } from 'react'
import { Redirect, Route } from 'react-router-dom'
import { AuthContext } from '../context/auth'

function AuthRoute_2({ component: Component, ...rest }) {

    // มีข้อมูล user ใน AuthContext หรือไม่
    const { user } = useContext(AuthContext)

    return (
        <Route
            // ...rest = exact path="?"
            {...rest}
            render={
                // ถ้ามี ไปหน้า component ที่ส่งมา
                // ถ้าไม่มี ไปหน้า login
                props => user ? <Component {...props} /> : <Redirect to="/login" />
            }
        />
    )
}

export default AuthRoute_2
