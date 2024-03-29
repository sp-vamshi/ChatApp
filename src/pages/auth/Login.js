import React, { useEffect } from 'react'
import { Link as RouterLink } from "react-router-dom"
import { Link, Stack, Typography } from '@mui/material'
import AuthSocial from '../../sections/auth/AuthSocial'
import LoginForm from '../../sections/auth/LoginForm'

const Login = () => {

    useEffect(() => {
        window.localStorage.removeItem("user_id")
    }, [])

    return (
        <Stack spacing={2} sx={{ mb: 5, position: "relative", }}>
            <Typography variant="h4">Login to ChatterBox</Typography>
            <Stack direction="row" spacing={0.5}>
                <Typography variant='body2'>New User?</Typography>
                <Link to="/auth/register" component={RouterLink} variant="subtitle2">Create an account</Link>
            </Stack>
            {/* Login Form */}
            <LoginForm />
            {/* Auth Social */}
            <AuthSocial />
        </Stack>
    )
}

export default Login