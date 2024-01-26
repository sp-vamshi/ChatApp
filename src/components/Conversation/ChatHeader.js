import React from 'react'
import { faker } from "@faker-js/faker"
import { Avatar, Box, Stack, Typography, IconButton, Divider } from '@mui/material'
import { useTheme } from "@mui/material/styles"
import { CaretDown, MagnifyingGlass, Phone, VideoCamera } from 'phosphor-react';
import StyledBadge from '../StyledBade';
import { dispatch } from '../../redux/store';
import { ToggleSideBar } from '../../redux/slices/app';
import { useDispatch, useSelector } from 'react-redux';

export const ChatHeader = () => {
    const theme = useTheme()
    const dispatch = useDispatch()

    const { current_conversation } = useSelector(state => state.conversations.direct_chat)

    return (
        <Box p={2} sx={{ width: "100%", backgroundColor: theme.palette.mode === "light" ? "#F8FAFF" : theme.palette.background.paper, boxShadow: "0px 0px 2px rgba(0, 0, 0, 0.25)" }}>
            <Stack alignItems={"center"} direction={"row"} justifyContent={'space-between'} sx={{ height: "100%", width: "100%" }} >
                <Stack onClick={() => {
                    dispatch(ToggleSideBar())
                }}
                    direction={"row"} spacing={2}>
                    <Box>
                        {current_conversation?.online ?
                            <StyledBadge
                                overlap="circular"
                                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                                variant="dot"
                            >
                                <Avatar src={current_conversation?.img} alt={current_conversation?.name} />
                            </StyledBadge> :
                            <Avatar src={current_conversation?.img} alt={current_conversation?.name} />
                        }
                    </Box>
                    <Stack spacing={0.2} >
                        <Typography variant='subtitle2' >{current_conversation?.name}</Typography>
                        <Typography variant='caption' >{current_conversation?.online ? "Online" : "Offline"}</Typography>
                    </Stack>
                </Stack>
                <Stack direction={"row"} alignItems={"center"} spacing={3} >
                    <IconButton>
                        <VideoCamera />
                    </IconButton>
                    <IconButton>
                        <Phone />
                    </IconButton>
                    <IconButton>
                        <MagnifyingGlass />
                    </IconButton>
                    <Divider orientation='vertical' flexItem />
                    <IconButton>
                        <CaretDown />
                    </IconButton>
                </Stack>
            </Stack>
        </Box>
    )
}
