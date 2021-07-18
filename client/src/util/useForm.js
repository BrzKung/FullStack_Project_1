import { useState } from 'react'

export const useForm = (callback, initialState = {}) => {

    // รับค่า(value)ต่างๆ จาก Form
    const [values, setValues] = useState(initialState)

    // ฟังก์ชั่นเซตค่าขณะพิมพ์(value)ต่างๆ ที่รับจาก Form
    const onChange = e => {
        // ...values = username email password confirmpassword...
        // [e.target.name] =[username,password ,email, ....]
        setValues({ ...values, [e.target.name]: e.target.value })
    }

    // ฟังก์ชั่น submit Form
    const onSubmit = e => {
        e.preventDefault()

        // ให้ฟังก์ชั่นที่ส่งมาทำงาน
        callback()
    }

    // ส่งค่าไปหน้าต่างๆ
    return {
        onChange,
        onSubmit,
        values
    }
}
