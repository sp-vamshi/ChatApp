import React, { useEffect, useState } from 'react'
import { Box, IconButton, Stack, Typography, InputBase, Button, Divider, Avatar, Badge } from '@mui/material'
import { ArchiveBox, CircleDashed, MagnifyingGlass, Users } from 'phosphor-react'
import { useTheme } from "@mui/material/styles"
import { SimpleBarStyle } from "../../components/Scrollbar";
import "../../App.css"
import { ChatList } from "../../data"
import { Search, SearchIconWrapper, StyledInputBase } from "../../components/Search/index"
import ChatElement from '../../components/ChatElement';
import Friends from '../../sections/main/Friends';
import { socket } from '../../socket';
import { useSelector, useDispatch } from 'react-redux';
import { FetchDirectConversations } from '../../redux/slices/conversation';


export const Chats = () => {
    const [openDialog, setOpenDialog] = useState(false)
    const theme = useTheme();
    const dispatch = useDispatch();

    const { user_id } = useSelector(state => state.auth)

    const { conversations } = useSelector(state => state.conversations.direct_chat)

    useEffect(() => {
        socket?.emit("get_direct_conversations", { user_id }, (data) => {
            console.log(data)
            //  data => list of conversations
            console.log(user_id)
            dispatch(FetchDirectConversations({ conversations: data, user_id: user_id }));
        })
    }, [])

    const handleOpenDialog = () => {
        setOpenDialog(true)
    }
    const handleCloseDialog = () => {
        setOpenDialog(false)
    }

    return (
        <>

            <Box sx={{
                position: "relative", height: "100vh", width: 320, boxShadow: "0px 0px 2px rgba(0, 0, 0, 0.25)",
                backgroundColor: theme.palette.mode === "light" ? "#F8FAFF" : theme.palette.background.paper,
            }} >
                <Stack p={3} spacing={2} sx={{ height: "100vh" }} >
                    <Stack direction={"row"} alignItems={"center"} justifyContent={"space-between"}>
                        <Typography variant='h5'>
                            Chats
                        </Typography>
                        <Stack direction="row" alignItems={"center"} spacing={1}>
                            <IconButton onClick={handleOpenDialog} >
                                <Users />
                            </IconButton>
                            <IconButton >
                                <CircleDashed />
                            </IconButton>
                        </Stack>
                    </Stack>
                    <Stack sx={{ width: "100%" }}>
                        <Search>
                            <SearchIconWrapper>
                                <MagnifyingGlass color="#709CE6" />
                            </SearchIconWrapper>
                            <StyledInputBase inputProps={{ "aria-label": "search" }} placeholder='Search' />
                        </Search>
                    </Stack>

                    <Stack spacing={2} direction={"column"} sx={{ flexGrow: 1, overflowY: "scroll", height: "100%", }} >
                        <SimpleBarStyle timeout={500} clickOnTrack={false}>

                            <Stack pt={1} spacing={2.4}>
                                <Typography variant='subtitle2' sx={{ color: "#676767" }}>All Chats</Typography>
                                {conversations.map(el => {
                                    return <ChatElement key={el.id} {...el} />
                                })}
                            </Stack>
                        </SimpleBarStyle>
                    </Stack>
                </Stack>
            </Box>
            {openDialog && <Friends open={openDialog} handleClose={handleCloseDialog} />}
        </>
    )
}
