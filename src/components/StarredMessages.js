import { Box, Stack, IconButton, Typography, } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import React from 'react'
import { useDispatch } from 'react-redux'
import { UpdateSideBarType } from '../redux/slices/app'
import { CaretLeft } from 'phosphor-react'
import { Message } from './Conversation/Message'


export const StarredMessages = () => {


    const theme = useTheme()
    const dispatch = useDispatch()


    return (
        <Box sx={{ width: 320, height: '100vh' }}>
            <Stack sx={{ height: "100%" }}>
                <Box sx={{
                    boxShadow: "0px 0px 2px rgba(0, 0, 0, 0.25)",
                    width: "100%",
                    backgroundColor: theme.palette.mode === "light" ? "#F8FAFF" : theme.palette.background,
                }}>
                    <Stack direction={"row"} alignItems={"center"} spacing={2} sx={{ height: "100%", p: 2 }}>
                        <IconButton onClick={() => dispatch(UpdateSideBarType("CONTACT"))} ><CaretLeft /></IconButton>
                        <Typography variant='subtitle2'>Starred Messages</Typography>
                    </Stack>
                </Box>

                {/* Body */}
                <Stack sx={{ height: "100%", position: "relative", flexGrow: 1, overflowY: "auto" }} p={3} spacing={3}>
                    <Message menu={false} />
                </Stack>
            </Stack>
        </Box>
    )
}
