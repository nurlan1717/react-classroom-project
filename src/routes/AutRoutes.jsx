import React from 'react'
import { Route, Routes } from 'react-router-dom'
import RegistrationForm from "../pages/Register";
import Login from "../pages/Login";
import NotFound from "../pages/NotFound";


const AutRoutes = () => {
    return (
        <>
            <Routes>
                <Route index element={<RegistrationForm />} />
                <Route path="/login" element={<Login />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </>

    )
}

export default AutRoutes