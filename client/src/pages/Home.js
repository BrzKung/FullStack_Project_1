import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import { Dimmer, Grid, Image, Loader } from 'semantic-ui-react'
import PersonalCard from '../component/PersonalCard'
import { AuthContext } from '../context/auth'
import { PersonalContext } from '../context/personal'

function Home() {

    // นำ user(ที่ login) จาก context มาใช้
    const { user } = useContext(AuthContext)
    const { personal, getPersonal } = useContext(PersonalContext)

    const [errors, setErrors] = useState()
    const [loading, setLoading] = useState(false)

    // เมื่อเปิดมาหน้า home
    useEffect(() => {

        setLoading(true)

        // แสดงประวัติส่วนตัวของ user
        const fetchData = async () => {

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `BrzKung ${localStorage.getItem('authToken')}`
                }
            }

            try {

                const { data } = await axios.get(`http://localhost:4000/personal/${user.id}`, config)

                getPersonal(data)

            } catch (error) {
                if (error) { setErrors(error.response.data.errors) }
            } finally {
                setLoading(false)
            }
        }

        //ไม่ควรใช้ async ที่ useEffect
        // สร้างฟังก์ชั่นไหม่มาใช้งาน
        fetchData()
    }, [user.id])

    return (
        <Grid columns={3}>
            <Grid.Row>
                <Grid.Column width={4}>
                    <Image src='https://react.semantic-ui.com/images/wireframe/media-paragraph.png' />
                </Grid.Column >
                <Grid.Column width={8}>
                    {loading ? (
                        <Dimmer active inverted>
                            <Loader />
                        </Dimmer>
                    ) : personal ? (
                        <PersonalCard />
                    ) : (
                        <div>
                            <h1>You haven't got a personal data ?</h1>
                            <Link to='/add'>เพิ่มข้อมูล</Link>
                        </div>
                    )}

                </Grid.Column>
                <Grid.Column width={4}>
                </Grid.Column>
            </Grid.Row>
        </Grid >
    )
}

export default Home
