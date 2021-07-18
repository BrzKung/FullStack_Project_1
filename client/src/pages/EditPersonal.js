import axios from 'axios'
import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'

import { Button, Form } from 'semantic-ui-react'
import { AuthContext } from '../context/auth'
import { PersonalContext } from '../context/personal'
import { useForm } from '../util/useForm'

// กรอกประวัติส่วนตัว
function EditPersonal(props) {


    // นำ user(ที่ login) จาก context มาใช้
    const { user } = useContext(AuthContext)
    // นำ personal จาก context มาใช้
    const { personal } = useContext(PersonalContext)

    // เอาค่าต่างๆ จาก personal
    const { head, fullname, age, address, job, favorite_food } = personal

    const [errors, setErrors] = useState({})
    const [loading, setLoading] = useState(false)

    // เอา onChange, onSubmit, values มาใช้งาน
    // โดยส่ง personalCallback (ข้อมูลประวัติส่วนตัว) ไป พร้อมกับค่าเริ่มต่น
    const { onSubmit, onChange, values } = useForm(personalCallback, {
        head, fullname, age, address, job, favorite_food
    })

    // ฟังก์ชั่นเมื่อกด บันทึกประวัติส่วนตัว
    const personalHandler = async () => {

        setLoading(true)

        // กำหนด req.headers
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `BrzKung ${localStorage.getItem('authToken')}`
            }
        }

        try {
            // ส่งข้อมูลไป server
            await axios.put(`http://localhost:4000/personal/${user.id}/edit`, values, config)

            // console.log(data)
            props.history.push('/')

        } catch (error) {
            if (error) {
                setErrors(error.response.data.errors)
            }
        } finally {
            setLoading(false)
        }
    }

    // callbackFunction บรรทัด 18 ส่ง personalHandler ไป
    function personalCallback() {
        personalHandler()
    }

    return (
        // เมื่อกดแก้ไขข้อมูล
        // แสดง form แก้ไขข้อมูล
        <div className="personal_form">
            <Form noValidate onSubmit={onSubmit} className={loading ? 'loading' : ''}>
                <Form.Input
                    label="คำนำหน้า"
                    name="head"
                    placeholder="คำนำหน้า"
                    value={values.head}
                    error={errors.head ? true : false, errors.head}
                    onChange={onChange}
                />

                <Form.Input
                    label="ชื่อ-สกุล"
                    name="fullname"
                    placeholder="ชื่อ-สกุล"
                    value={values.fullname}
                    error={errors.fullname ? true : false, errors.fullname}
                    onChange={onChange}

                />

                <Form.Input
                    label="อายุ"
                    name="age"
                    placeholder="อายุ"
                    value={values.age}
                    error={errors.age ? true : false, errors.age}
                    onChange={onChange}

                />

                <Form.Input
                    label="ที่อยู่"
                    name="address"
                    placeholder="ที่อยู่"
                    value={values.address}
                    error={errors.address ? true : false, errors.address}
                    onChange={onChange}

                />

                <Form.Input
                    label="อาชีพ"
                    name="job"
                    placeholder="อาชีพ"
                    value={values.job}
                    error={errors.job ? true : false, errors.job}
                    onChange={onChange}

                />

                <Form.Input
                    label="อาหารที่ชอบ"
                    name="favorite_food"
                    placeholder="อาหารที่ชอบ"
                    value={values.favorite_food}
                    error={errors.favorite_food ? true : false, errors.favorite_food}
                    onChange={onChange}

                />
                <Button primary>บันทึก</Button>
                <Button color='red' as={Link} to='/' >ย้อนกลับ</Button>
            </Form>
        </div>
    )

}

export default EditPersonal
