
// ตรวจสอบตอน register , login

module.exports.validateRegister = (username, email, password, confirmPassword) => {
    const errors = {}

    if (username.trim() == '') {
        // ถ้าไม่กรอก username
        errors.username = 'Username must not be empty'
    } else if (username.trim().length < 5) {
        // ถ้า username < 5 ตัวอักษร
        errors.username = 'Username should be atleast 5 character'
    }

    if (email.trim() == '') {
        // ถ้าไม่กรอก email
        errors.email = 'Email must not be empty'
    } else {
        // กำหนด form ของ email
        const regEx = /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/
        if (!email.match(regEx)) {
            // ถ้ากรอก email ไม่ตรง form
            errors.email = 'Email must be a valid email address'
        }
    }

    if (password.trim() == '') {
        // ถ้าไม่กรอก password
        errors.password = 'Password must not be empty'
    } else if (password.trim().length < 5) {
        // ถ้า password < 5 ตัวอักษร
        errors.password = 'Password should be atleast 5 character'
    } else if (password != confirmPassword) {
        // ถ้า password ไม่เท่ากับ confirmpassword
        errors.password = 'Password must match'
    }

    // ส่งค่าไป
    return {
        errors, //error ที่เกิด
        valid: Object.keys(errors).length < 1 //valid = true จะส่งไป
    }
}

module.exports.validateLogin = (email, password) => {
    const errors = {}

    if (email.trim() == '') {
        // ถ้าไม่กรอก email
        errors.email = 'Email must not be empty'
    }

    if (password.trim() == '') {
        // ถ้าไม่กรอก email
        errors.password = 'Password must not be empty'
    }

    // ส่งค่าไป
    return {
        errors,  //error ที่เกิด
        valid: Object.keys(errors).length < 1 //valid = true จะส่งไป
    }
}

module.exports.validatePersonal = (head, fullname, age, address, job, favorite_food) => {
    const errors = {}

    if (head.trim() == '') {
        errors.head = 'Header must not be empty'
    }

    if (fullname.trim() == '') {
        errors.fullname = 'Name must not be empty'
    }

    if (age.trim() == '') {
        errors.age = 'Age must not be empty'
    }

    if (address.trim() == '') {
        errors.address = 'Address must not be empty'
    }

    if (job.trim() == '') {
        errors.job = 'Job must not be empty'
    }

    if (favorite_food.trim() == '') {
        errors.favorite_food = 'Favorite food must not be empty'
    }

    return {
        errors,
        valid: Object.keys(errors).length < 1
    }
}

module.exports.validateChangePassword = (email, password, newPassword, confirmNewPassword) => {
    const errors = {}

    if (email.trim() == '') {
        // ถ้าไม่กรอก email
        errors.email = 'Email must not be empty'
    } else {
        // กำหนด form ของ email
        const regEx = /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/
        if (!email.match(regEx)) {
            // ถ้ากรอก email ไม่ตรง form
            errors.email = 'Email must be a valid email address'
        }
    }

    if (password.trim() == '') {
        // ถ้าไม่กรอก email
        errors.password = 'Password must not be empty'
    }

    if (newPassword.trim() == '') {
        // ถ้าไม่กรอก password
        errors.newPassword = 'New Password must not be empty'
    } else if (newPassword.trim().length < 5) {
        // ถ้า password < 5 ตัวอักษร
        errors.newPassword = 'New Password should be atleast 5 character'
    } else if (newPassword != confirmNewPassword) {
        // ถ้า password ไม่เท่ากับ confirmpassword
        errors.newPassword = 'Password must match'
    } else if (password == newPassword) {
        errors.newPassword = 'Password and New Password should not match'
    }

    return {
        errors,
        valid: Object.keys(errors).length < 1
    }
}