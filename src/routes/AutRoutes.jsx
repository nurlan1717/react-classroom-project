import React from 'react'
import { Route, Routes } from 'react-router-dom'
import RegistrationForm from "../pages/Register";
import Login from "../pages/Login";

const AutRoutes = () => {
    return (
        <>
            <Routes>
                <Route index element={<RegistrationForm />} />
                <Route path="/login" element={<Login />} />
            </Routes>
        </>

    )
}

export default AutRoutes