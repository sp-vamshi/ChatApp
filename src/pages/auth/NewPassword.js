import { Link as RouterLink } from "react-router-dom"
import { Link, Stack, Typography } from '@mui/material'
import { CaretLeft } from 'phosphor-react'
import NewPasswordForm from "../../sections/auth/NewPasswordForm"

const NewPassword = () => {
    return (
        <>
            <Stack spacing={2} sx={{ mb: 5, position: "relative" }}>
                <Typography variant='h3' paragraph>Reset Password</Typography>
                <Typography sx={{ cololr: "text.secondary", mb: 5 }} paragraph>Please set new password</Typography>
            </Stack>
            {/* New Password Form */}
            <NewPasswordForm />

            <Link to="/auth/login" color="inherit" variant="subtitle2" component={RouterLink}
                sx={{ mt: 3, mx: "auto", alignItems: "center", display: "inline-flex" }} >
                <CaretLeft />
                Return to Sign
            </Link>

        </>
    )
}

export default NewPassword