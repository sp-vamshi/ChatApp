import React from 'react'
import { Box, IconButton, Stack, Typography, InputBase, Button, Divider, Avatar, Badge } from '@mui/material'
import { ArchiveBox, CircleDashed, MagnifyingGlass } from 'phosphor-react'
import { useTheme } from "@mui/material/styles"
import { SimpleBarStyle } from "../../components/Scrollbar";
import "../../App.css"
import { ChatList } from "../../data"
import { Search, SearchIconWrapper, StyledInputBase } from "../../components/Search/index"
import ChatElement from '../../components/ChatElement';


export const Chats = () => {
    const theme = useTheme()
    return (
        <Box sx={{
            position: "relative", height: "100vh", width: 320, boxShadow: "0px 0px 2px rgba(0, 0, 0, 0.25)",
            backgroundColor: theme.palette.mode === "light" ? "#F8FAFF" : theme.palette.background.paper,
        }} >
            <Stack p={3} spacing={2} sx={{ height: "100vh" }} >
                <Stack direction={"row"} alignItems={"center"} justifyContent={"space-between"}>
                    <Typography variant='h5'>
                        Chats
                    </Typography>
                    <IconButton >
                        <CircleDashed />
                    </IconButton>
                </Stack>
                <Stack sx={{ width: "100%" }}>
                    <Search>
                        <SearchIconWrapper>
                            <MagnifyingGlass color="#709CE6" />
                        </SearchIconWrapper>
                        <StyledInputBase inputProps={{ "aria-label": "search" }} placeholder='Search' />
                    </Search>
                </Stack>
                <Stack spacing={1}>
                    <Stack direction={"row"} alignItems={"center"} spacing={1.5} >
                        <ArchiveBox size={24} />
                        <Button>Archive</Button>
                    </Stack>
                    <Divider />
                </Stack>
                <Stack spacing={2} direction={"column"} sx={{ flexGrow: 1, overflowY: "scroll", height: "100%", }} >
                    <SimpleBarStyle timeout={500} clickOnTrack={false}>
                        <Stack spacing={2.4}>
                            <Typography variant='subtitle2' sx={{ color: "#676767" }}>Pinned</Typography>
                            {ChatList.filter(el => el.pinned).map(el => {
                                return <ChatElement key={el.id} {...el} />
                            })}
                        </Stack>
                        <Stack pt={1} spacing={2.4}>
                            <Typography variant='subtitle2' sx={{ color: "#676767" }}>All Chats</Typography>
                            {ChatList.filter(el => !el.pinned).map(el => {
                                return <ChatElement key={el.id} {...el} />
                            })}
                        </Stack>
                    </SimpleBarStyle>
                </Stack>
            </Stack>
        </Box>
    )
}
