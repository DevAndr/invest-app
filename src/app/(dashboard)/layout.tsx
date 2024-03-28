'use client'

import '../syles/AppBar.scss'
import {
    Avatar, Button, DropdownItem,
    DropdownMenu,
    Link,
    Navbar,
    NavbarBrand,
    NavbarContent, NavbarItem,
    NavbarMenu,
    NavbarMenuItem,
    NavbarMenuToggle
} from "@nextui-org/react";
import React, {ReactNode, useState} from "react";
import {IoExitOutline, IoSettingsOutline} from "react-icons/io5";
import {FaChartLine, FaRegUser} from "react-icons/fa";
import {LuLogOut} from "react-icons/lu";
import TitleAppBarProvider from "@/providers/TitleAppBar";
import TitleAppBar from "@/providers/TitleAppBar";
import Appbar from "@/components/Appbar/Appbar";
import {Dropdown, DropdownTrigger} from "@nextui-org/dropdown";
import {MdOutlineChecklist} from "react-icons/md";

type DashboardProps = {
    children: ReactNode
}
type MenuItem = {
    title: string
    link: string
    icon: ReactNode
}

const menuItems: MenuItem[] = [
    {title: 'Analytics', icon: <FaChartLine/>, link: '/'},
    {title: 'Profile', icon: <FaRegUser/>, link: '/profile'},
    {title: 'Settings', icon: <IoSettingsOutline/>, link: '/settings'},
    {title: 'Logout', icon: <LuLogOut/>, link: '/logout'},
]
export default function DashboardLayout({children}: DashboardProps) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isAuth, setIsAuth] = useState(true)

    return (
        <>
            <header>
                <Navbar className='appBar'>
                    <NavbarContent justify='start'>
                        <NavbarBrand>
                            <p className="font-bold text-inherit">ACME</p>
                        </NavbarBrand>
                    </NavbarContent>
                    <NavbarContent justify='center'>
                       <Appbar/>
                    </NavbarContent>
                    <NavbarMenu>
                        {menuItems.map((item, index) => (
                            <NavbarMenuItem key={`${item}-${index}`}>
                                <Link
                                    color={'foreground'}
                                    className="w-full"
                                    href={item.link}
                                    size="lg">
                                    <div className='flex gap-4 items-center cursor-pointer'>
                                        {item.icon}
                                        <label className='cursor-pointer'>{item.title}</label>
                                    </div>
                                </Link>
                            </NavbarMenuItem>
                        ))}
                    </NavbarMenu>
                    <NavbarContent justify={'end'}>
                        <NavbarItem className='profileAvatar'>
                            {isAuth ? (
                                <Dropdown placement='bottom-end'>
                                    <DropdownTrigger>
                                        <Avatar src='https://i.pravatar.cc/150?u=a042581f4e29026024d' />
                                    </DropdownTrigger>
                                    <DropdownMenu aria-label='Profile Actions' variant='flat'>
                                        <DropdownItem
                                            key='profile'
                                            color='primary'
                                            startContent={<FaRegUser />}
                                            href='/profile'
                                        >
                                            Профиль
                                        </DropdownItem>
                                        <DropdownItem
                                            key='profile'
                                            color='primary'
                                            startContent={<MdOutlineChecklist />}
                                            href='/wishlist'
                                        >
                                            Карта желаний
                                        </DropdownItem>

                                        <DropdownItem
                                            key='profile'
                                            color='primary'
                                            startContent={<IoSettingsOutline />}
                                            href='/settings'
                                        >
                                            Настройки
                                        </DropdownItem>
                                        <DropdownItem
                                            key='logout'
                                            color='danger'
                                            startContent={<IoExitOutline />}
                                        >
                                            Выйти
                                        </DropdownItem>
                                    </DropdownMenu>
                                </Dropdown>
                            ) : (
                                <Button as={Link} color='primary' href='#' variant='flat'>
                                    Войти
                                </Button>
                            )}
                        </NavbarItem>
                        <NavbarMenuToggle aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                                          className="sm:hidden">

                        </NavbarMenuToggle>
                    </NavbarContent>
                </Navbar>
            </header>
            <main className='m-6'>
                {children}
            </main>
            <footer>

            </footer>
        </>
    )
}