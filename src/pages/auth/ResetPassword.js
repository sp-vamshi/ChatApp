import React from 'react'
import { Link as RouterLink } from "react-router-dom"

import { Link, Stack, Typography } from '@mui/material'
import { CaretLeft } from 'phosphor-react'
import ResetPasswordForm from '../../sections/auth/ResetPasswordForm'


const ResetPassword = () => {
    return (
        <Stack spacing={2} sx={{ mb: 5, position: "relative" }}>
            <Typography variant="h4" paragraph> Forgot your Password? </Typography>
            <Typography sx={{ color: "text.secondary", mb: 5 }}>
                Please enter the email address associated with your account and We
                will email you a link to reset your password.
            </Typography>
            {/* Reset Password Form */}
            <ResetPasswordForm />
            <Link to="/auth/login" color="inherit" variant="subtitle2" component={RouterLink}
                sx={{ mt: 3, mx: "auto", alignItems: "center", display: "inline-flex" }} >
                <CaretLeft />
                Return to Sign
            </Link>
        </Stack>
    )
}

export default ResetPassword