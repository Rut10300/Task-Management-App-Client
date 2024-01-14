import { useState } from 'react'
import { Routes, Route, NavLink, Link, Outlet } from "react-router-dom"
import Header from './Header'

export default function LayoutHome() {
    return (
        <>
            <Header />
            <main>
                <Outlet />
            </main>
        </>
    )
}


