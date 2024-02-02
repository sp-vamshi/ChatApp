import React from 'react'
import { faker } from "@faker-js/faker"
import { Avatar, Box, Stack, Typography, IconButton, Divider } from '@mui/material'
import { useTheme } from "@mui/material/styles"
import { CaretDown, CaretLeft, MagnifyingGlass, Phone, VideoCamera } from 'phosphor-react';
import StyledBadge from '../StyledBade';
import { SelectConversation, ToggleSideBar } from '../../redux/slices/app';
import { useDispatch, useSelector } from 'react-redux';
import useDevice from '../../utils/useDevice';
import { ClearCurrentMessages, SetCurrentConversation } from '../../redux/slices/conversation';

export const ChatHeader = () => {
    const theme = useTheme()
    const dispatch = useDispatch()
    const [device] = useDevice()

    const { current_conversation } = useSelector(state => state.conversations.direct_chat)

    function handleCloseChat() {
        dispatch(SelectConversation({ room_id: null, chat_type: null }))
        dispatch(SetCurrentConversation(null))
        dispatch(ClearCurrentMessages())
        dispatch(ToggleSideBar(false))
    }

    return (
        <Box p={2} sx={{ width: "100%", transition: "all 0.2s", backgroundColor: theme.palette.mode === "light" ? "#F8FAFF" : theme.palette.background.paper, boxShadow: "0px 0px 2px rgba(0, 0, 0, 0.25)" }}>
            <Stack alignItems={"center"} direction={"row"} justifyContent={'space-between'} sx={{ height: "100%", width: "100%" }} >
                <Stack direction={"row"} alignItems={"center"}>
                    <IconButton onClick={handleCloseChat}>
                        <CaretLeft />
                    </IconButton>
                    <Stack
                        onClick={() => {
                            dispatch(ToggleSideBar(true))
                        }}
                        direction={"row"} spacing={2}
                    >
                        <Box p={0.5}>
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
                    </Stack>
                    <Stack spacing={0.2} >
                        <Typography variant='subtitle2' >{current_conversation?.name}</Typography>
                        <Typography variant='caption' >{current_conversation?.online ? "Online" : "Offline"}</Typography>
                    </Stack>
                </Stack>
                <Stack direction={"row"} alignItems={"center"} spacing={3} >
                    <IconButton>
                        <Phone />
                    </IconButton>
                    <IconButton>
                        <VideoCamera />
                    </IconButton>
                    {device.Desktop && <IconButton>
                        <MagnifyingGlass />
                    </IconButton>}
                </Stack>
            </Stack>
        </Box>
    )
}
