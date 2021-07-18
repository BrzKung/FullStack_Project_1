import React, { useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

import { Button, Form } from 'semantic-ui-react'
import { AuthContext } from '../context/auth'
import { useForm } from '../util/useForm'
import { PersonalContext } from '../context/personal'


// แสดงประวัติส่วนตัว
function PersonalCard(props) {

    const { personal } = useContext(PersonalContext)

    // รับ ประวัติส่วนตัวจาก props
    const { head, fullname, age, address, job, favorite_food } = personal

    return (
        <div>
            <h1>ประวัติส่วนตัว</h1>
            <p>คำนำหน้า : {head}</p>
            <p>ชื่อ-สกุล : {fullname}</p>
            <p>ที่อยู่ : {address}</p>
            <p>อายุ : {age}</p>
            <p>งาน : {job}</p>
            <p>อาหารที่ชอบ : {favorite_food}</p>
            <Button color='green' as={Link} to="/edit">แก้ไขข้อมูล</Button>
        </div>

    )
}

export default PersonalCard
