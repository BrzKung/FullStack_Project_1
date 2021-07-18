import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'

import { Button, Form } from 'semantic-ui-react'
import { useForm } from '../util/useForm'
import { AuthContext } from '../context/auth'

function NormalLogin(props) {
    // ให้ login จาก context ทำงานหน้านี้ได้
    const { login } = useContext(AuthContext)

    const [errors, setErrors] = useState({})
    const [loading, setLoading] = useState(false)

    // เอา onChange, onSubmit, values มาใช้งาน
    // โดยส่ง loginCallback (ข้อมูลการเข้าสู่ระบบ) ไป พร้อมกับค่าเริ่มต่น
    const { onSubmit, onChange, values } = useForm(loginCallback, {
        email: '',
        password: ''
    })

    // ฟังก์ชั่นเมื่อกด login
    const loginHandler = async () => {

        setLoading(true)

        // กำหนด req.headers
        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        }

        try {

            // login
            const { data } = await axios.post('http://localhost:4000/api/login', values, config)

            // นำข้อมูลจาก server ไปเก็บที่ context
            login(data)

        } catch (error) {
            // เมื่อเกิด error รับ error จาก data 
            if (error) {
                setErrors(error.response.data.errors)
            }
        } finally {
            setLoading(false)
        }
    }

    // callbackFunction บรรทัด 11 ส่ง loginHandler ไป
    function loginCallback() {
        loginHandler()
    }

    return (
        <div className="form-container">
            <h1>Login</h1>
            <Form noValidate onSubmit={onSubmit} className={loading ? 'loading' : ''}>
                <Form.Input
                    label="Email"
                    placeholder="Email.."
                    name="email"
                    value={values.email}
                    error={errors.email ? true : false, errors.email}
                    type="email"
                    onChange={onChange}
                />
                <Form.Input
                    label="Password"
                    placeholder="Password.."
                    name="password"
                    value={values.password}
                    error={errors.password ? true : false, errors.password}
                    type="password"
                    onChange={onChange}
                />
                <Button type="submit" primary>Login</Button>
            </Form>
        </div>
    )
}

export default NormalLogin
