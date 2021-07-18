import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'

import { Button, Form } from 'semantic-ui-react'
import { useForm } from '../util/useForm'
import { AuthContext } from '../context/auth'

function Register(props) {

    // ให้ login จาก context ทำงานหน้านี้ได้
    const { login } = useContext(AuthContext)

    const [errors, setErrors] = useState({})
    const [loading, setLoading] = useState(false)

    // เอา onChange, onSubmit, values มาใช้งาน
    // โดยส่ง registerCallback (ข้อมูลการสมัครสมาชิก) ไป พร้อมกับค่าเริ่มต่น
    const { onSubmit, onChange, values } = useForm(registerCallback, {
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    })

    // ฟังก์ชั่นเมื่อกด register
    const registerHandler = async () => {

        setLoading(true)

        // กำหนด req.headers
        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        }

        try {
            // ส่งข้อมููลไป server
            const { data } = await axios.post('http://localhost:4000/api/register', values, config)

            // นำข้อมูลจาก server ไปเก็บที่ context
            login(data)

        } catch (error) {
            // รับ error จาก server นำมาแสดง
            if (error) {
                setErrors(error.response.data.errors)
            }
        } finally {
            setLoading(false)
        }
    }

    // callbackFunction บรรทัด 13 ส่ง registerHandler ไป
    function registerCallback() {
        registerHandler()
    }

    return (
        <div className="form-container">
            <h1>Register</h1>
            <Form noValidate onSubmit={onSubmit} className={loading ? 'loading' : ''}>
                <Form.Input
                    label="Username"
                    placeholder="Username.."
                    name="username"
                    value={values.username}
                    error={errors.username ? true : false, errors.username}
                    type="text"
                    onChange={onChange}

                />
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
                <Form.Input
                    label="Confirm-Password"
                    placeholder="Confirm-Password.."
                    name="confirmPassword"
                    value={values.confirmPassword}
                    error={errors.password ? true : false}
                    type="password"
                    onChange={onChange}

                />
                <Button type="submit" primary>Register</Button>
            </Form>
        </div>
    )
}

export default Register
