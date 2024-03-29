import { Stack, Box, IconButton, Typography } from '@mui/material'
import { CaretLeft } from 'phosphor-react'
import React from 'react'
import ProfileForm from '../../sections/settings/ProfileForm'
import { ChangeTab } from '../../redux/slices/app'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const Profile = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    return (
        <div>
            <Stack direction={"row"} sx={{ width: "100%" }}>
                <Box
                    sx={{
                        height: '100vh', width: 320, boxShadow: "0px 0px 2px rgba(0, 0, 0, 0.25)",
                        backgroundColor: (theme) => theme.palette.mode === "light" ? "#F8FAFF" : theme.palette.background
                    }}>
                    <Stack p={4} spacing={5}>
                        {/* Header */}
                        <Stack direction={"row"} alignItems={"center"} spacing={3} >
                            <IconButton onClick={() => {
                                dispatch(ChangeTab({ tabNumber: 0 }))
                                navigate("/app")
                            }}>
                                <CaretLeft size={24} color='#4B4B4B' />
                            </IconButton>
                            <Typography variant='h5'>Profile</Typography>
                        </Stack>
                        {/* Profile Form */}
                        <ProfileForm />
                    </Stack>
                </Box>
            </Stack>
        </div>
    )
}

export default Profile