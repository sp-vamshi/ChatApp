import { Stack, Typography } from '@mui/material'
import VerifyForm from '../../sections/auth/VerifyForm'


const Verify = () => {
    return (
        <>
            <Stack spacing={2} sx={{ mb: 4, position: "relative" }}>
                <Typography variant='h4' >Please Verify OTP</Typography>
            </Stack>
            <Stack direction={"row"} sx={{ mb: 4 }} spacing={0.5}>
                <Typography variant='body2' >Email sent to your registered mail id. </Typography>
            </Stack>
            {/* Verify Form */}
            <VerifyForm />
        </>
    )
}

export default Verify