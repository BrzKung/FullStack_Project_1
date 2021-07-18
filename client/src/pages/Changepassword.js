import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'

import { Button, Form } from 'semantic-ui-react'
import { useForm } from '../util/useForm'
import { AuthContext } from '../context/auth'

function Changepassword(props) {

    const { logout } = useContext(AuthContext)

    const [errors, setErrors] = useState({})

    // เอา onChange, onSubmit, values มาใช้งาน
    // โดยส่ง changePasswordCallback (ข้อมูลการเปลี่ยนรหัส) ไป พร้อมกับค่าเริ่มต่น
    const { onSubmit, onChange, values } = useForm(changePasswordCallback, {
        email: '',
        password: '',
        newPassword: '',
        confirmNewPassword: ''
    })

    // ฟังก์ชั่นเมื่อกด changepassword
    const changePasswordHandler = async () => {

        // กำหนด req.headers
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `BrzKung ${localStorage.getItem('authToken')}`
            }
        }

        try {
            // ส่งข้อมููลไป server
            const { data } = await axios.put('http://localhost:4000/api/changePassword', values, config)

            // ลบข้อมูลใน context ทั้งหมด
            logout()

        } catch (error) {
            // รับ error จาก server นำมาแสดง
            setErrors(error.response.data.errors)
        }
    }

    // callbackFunction บรรทัด 13 ส่ง changePasswordHandler ไป
    function changePasswordCallback() {
        changePasswordHandler()
    }

    return (
        <div className="form-container">
            <h1>Change Password</h1>
            <Form noValidate onSubmit={onSubmit}>

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
                    label="New-Password"
                    placeholder="New-Password.."
                    name="newPassword"
                    value={values.newPassword}
                    error={errors.newPassword ? true : false, errors.newPassword}
                    type="password"
                    onChange={onChange}

                />
                <Form.Input
                    label="Confirm-New-Password"
                    placeholder="Confirm-New-Password.."
                    name="confirmNewPassword"
                    value={values.confirmNewPassword}
                    error={errors.newPassword ? true : false}
                    type="password"
                    onChange={onChange}

                />
                <Button type="submit" primary>Change Password</Button>
            </Form>
        </div>
    )
}

export default Changepassword
