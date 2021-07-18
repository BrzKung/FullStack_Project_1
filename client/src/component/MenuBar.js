import React, { useContext, useState } from 'react'
import { Menu } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../context/auth'
import { PersonalContext } from '../context/personal'

function MenuBar() {

    const { user, logout } = useContext(AuthContext)
    const { clearPersonal } = useContext(PersonalContext)

    const logoutHandler = () => {
        logout()
        clearPersonal()
    }

    // ไฮไลท์เมนูของหน้าที่เปิด
    // pathname = /link 
    const pathname = window.location.pathname
    // ถ้าอยู่ที่หน้า / จะได้ path = home
    // ถ้าไม่อยู่ที่หน้า /จะได้ path = ต้วที่อยู่หลัง / ( /login => path = login)
    const path = pathname === '/' ? 'Personal' : pathname.substr(1)
    // เมื่อคลิกที่ menu เอา name ของ Menu.Item มาใช้
    const handleItemClick = (e, { name }) => setActiveItem(name)

    const [activeItem, setActiveItem] = useState(path)

    const menuBar = user ? (
        // ถ้ามีการ login
        <Menu pointing secondary size="massive" color="blue">
            <Menu.Item
                name={user.username}
                onClick={handleItemClick}
                as={Link}
                to="/"
            />

            <Menu.Menu position='right'>
                <Menu.Item
                    name='Logout'
                    onClick={logoutHandler}
                />
            </Menu.Menu>
        </Menu>
    ) : (
        // ไม่ได้ login
        <Menu pointing secondary size="massive" color="blue">
            <Menu.Item
                name='Personal'
                active={activeItem === 'Personal'}
                onClick={handleItemClick}
                as={Link}
                to="/"
            />

            <Menu.Menu position='right'>
                <Menu.Item
                    name='login'
                    active={activeItem === 'login'}
                    onClick={handleItemClick}
                    as={Link}
                    to="/login"
                />
                <Menu.Item
                    name='register'
                    active={activeItem === 'register'}
                    onClick={handleItemClick}
                    as={Link}
                    to="/register"
                />
            </Menu.Menu>
        </Menu>
    )

    return menuBar
}

export default MenuBar
