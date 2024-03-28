'use client'

import {
    Link,
    Navbar,
    NavbarBrand,
    NavbarContent,
    NavbarMenu,
    NavbarMenuItem,
    NavbarMenuToggle
} from "@nextui-org/react";
import React, {ReactNode, useState} from "react";
import {IoHomeOutline, IoSettingsOutline} from "react-icons/io5";
import {FaChartLine, FaRegUser} from "react-icons/fa";
import {LuLogOut} from "react-icons/lu";

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

    return (
        <>
            <header>
                <Navbar>
                    <NavbarContent justify='start'>
                        <NavbarBrand>
                            <p className="font-bold text-inherit">ACME</p>
                        </NavbarBrand>
                    </NavbarContent>
                    <NavbarContent justify='center'>
                        Page title
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